import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Image as ImageIcon, MapPin, Sparkles, Trash2,
  CheckCircle, Loader2, Compass, AlertCircle, RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { useGeolocation } from '@/hooks/useGeolocation';
import PageTransition from '@/components/layout/PageTransition';
import { analyzeWasteWithGemini, type GeminiAnalysisResult } from '@/lib/gemini';
import { SEVERITY_LEVELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ReportWastePage() {
  const { user } = useAuth();
  const { addReport } = useApp();
  const { latitude, longitude, address, isLoading: geoLoading, detectLocation } = useGeolocation();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('');
  const [analysis, setAnalysis] = useState<GeminiAnalysisResult | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanError, setScanError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Trigger AI Scan
    setIsScanning(true);
    setScanProgress(0);
    setScanStatus('Reading image...');
    setAnalysis(null);
    setScanError(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 120);

    try {
      // Analyze with Gemini Vision (sends Base64 directly)
      setScanStatus('Analyzing with Gemini AI...');
      const result = await analyzeWasteWithGemini(file);
      clearInterval(interval);
      setScanProgress(100);
      setAnalysis(result);
    } catch (err: any) {
      console.error(err);
      clearInterval(interval);
      setScanError(err.message || 'Failed to analyze the image. Please try again.');
    } finally {
      setIsScanning(false);
      setScanStatus('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setScanStatus('');
    setScanProgress(0);
    setScanError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysis || !user) return;

    setIsSubmitting(true);

    const firestoreData = {
      imageUrl: imagePreview || '',
      wasteType: analysis.wasteType,
      confidence: analysis.confidence,
      severity: analysis.severity,
      estimatedCleanupTime: analysis.estimatedCleanupTime,
      suggestedDepartment: analysis.suggestedDepartment,
      environmentalImpact: analysis.environmentalImpact,
      estimatedWeightKg: analysis.estimatedWeightKg,
      riskLevel: analysis.riskLevel,
      recommendation: analysis.recommendation,
      latitude: latitude || 28.6273,
      longitude: longitude || 77.3725,
      address: address || 'Noida Sector 62, Uttar Pradesh',
      status: 'Pending',
      rewardPoints: 50,
      createdAt: serverTimestamp(),
      userId: user.id || 'mock-user-id',
      description,
    };

    try {
      await addDoc(collection(db, 'reports'), firestoreData);
      setShowToast(true);
      // Wait 2 seconds for the user to see the success toast
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (firestoreErr) {
      console.error('Firestore save failed:', firestoreErr);
    }

    // Keep local context in sync for the in-app UI
    addReport({
      id: `RPT-${Math.floor(100 + Math.random() * 900)}`,
      imageUrl: imagePreview || '',
      createdAt: new Date().toISOString(),
      status: 'submitted' as import('@/lib/constants').ReportStatus,
      latitude: firestoreData.latitude,
      longitude: firestoreData.longitude,
      address: firestoreData.address,
      location: address || 'Noida Sector 62',
      wasteType: analysis.wasteType as import('@/lib/constants').WasteType,
      severity: analysis.severity as import('@/lib/constants').SeverityLevel,
      confidence: analysis.confidence,
      userId: user.id || 'mock-user-id',
      description,
      userName: user.name,
      pointsAwarded: 0,
      updatedAt: new Date().toISOString(),
      department: analysis.suggestedDepartment,
      estimatedCleanupTime: analysis.estimatedCleanupTime,
    });

    setIsSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <PageTransition className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Report Waste</h1>
        <p className="text-sm text-gray-500">Capture a photo to start AI detection and file a report</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Card */}
        <div className="space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => !imagePreview && fileInputRef.current?.click()}
            className={cn(
              'upload-zone rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden',
              imagePreview && 'cursor-default border-none bg-black'
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />

            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                {isScanning && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white space-y-3">
                    <RefreshCw className="w-10 h-10 animate-spin text-green-400" />
                    <span className="text-sm font-semibold tracking-wide animate-pulse">{scanStatus || 'AI ANALYZING IMAGE...'}</span>
                    <span className="text-xs text-green-300 font-bold">{scanProgress}%</span>
                    <div className="w-[60%] h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </div>
                )}
                {!isScanning && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600/90 text-white rounded-xl backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800 text-sm">Drag and drop waste image here</p>
                  <p className="text-xs text-gray-400">or click to browse from device</p>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                  Supports JPG, PNG
                </span>
              </div>
            )}
          </div>

          {/* Location Card */}
          <div className="glass-strong rounded-3xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900">Live GPS Location</span>
              <button
                type="button"
                onClick={detectLocation}
                disabled={geoLoading}
                className="text-xs text-green-700 hover:text-green-800 font-bold flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
              >
                {geoLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MapPin className="w-3.5 h-3.5" />
                )}
                Locate Me
              </button>
            </div>

            {address ? (
              <div className="space-y-2">
                <div className="p-3 bg-green-50/30 border border-green-100/50 rounded-xl flex gap-2">
                  <Compass className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-800 block mb-0.5">Detected Address:</span>
                    {address}
                    <span className="text-[10px] text-gray-400 block mt-1">Lat: {latitude?.toFixed(4)}, Lng: {longitude?.toFixed(4)}</span>
                  </div>
                </div>

                <div className="w-full h-32 rounded-2xl map-placeholder border border-green-200/50 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center animate-ping absolute -top-2 -left-2" />
                    <MapPin className="w-8 h-8 text-green-600 relative z-10 animate-bounce-subtle" />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">Click Locate Me to grab live GPS coordinates</p>
            )}
          </div>
        </div>

        {/* AI Results / Submit form */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {scanError ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card border-red-200 bg-red-50/50 rounded-3xl p-8 text-center text-red-600 flex flex-col items-center justify-center min-h-[300px]"
              >
                <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
                <p className="text-sm font-semibold">Analysis Failed</p>
                <p className="text-xs text-red-500/80 max-w-xs mt-1">{scanError}</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : analysis ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="glass-strong rounded-3xl p-5 border border-green-200/60 shadow-soft-lg space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-100/30 rounded-full blur-xl" />
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                        <Sparkles className="w-3 h-3" />
                        Gemini Vision Scan
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 capitalize">{analysis.wasteType} Waste</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-green-600">{analysis.confidence}%</span>
                      <span className="text-[10px] text-gray-400 block">Confidence</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-400 block mb-1">Severity</span>
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold',
                        SEVERITY_LEVELS[analysis.severity as keyof typeof SEVERITY_LEVELS]?.color || 'bg-gray-100 text-gray-700'
                      )}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', SEVERITY_LEVELS[analysis.severity as keyof typeof SEVERITY_LEVELS]?.dot || 'bg-gray-500')} />
                        {analysis.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-400 block mb-1">Estimated Cleanup</span>
                      <span className="font-bold text-gray-800">{analysis.estimatedCleanupTime}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                      <span className="text-gray-400 block font-semibold">Estimated Weight</span>
                      <span className="font-bold text-gray-800">{analysis.estimatedWeightKg} kg</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                      <span className="text-gray-400 block font-semibold">Risk Level</span>
                      <span className="font-bold text-gray-800 capitalize">{analysis.riskLevel}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                    <span className="text-gray-400 block font-semibold">Suggested Department</span>
                    <span className="font-bold text-gray-800">{analysis.suggestedDepartment}</span>
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl text-xs space-y-1 border border-emerald-100">
                    <span className="text-emerald-800 font-bold block">Environmental Impact</span>
                    <p className="text-emerald-700 leading-relaxed text-[11px]">{analysis.environmentalImpact}</p>
                  </div>

                  <div className="p-3 bg-blue-50/50 rounded-xl text-xs space-y-1 border border-blue-100">
                    <span className="text-blue-800 font-bold block">Recommendation</span>
                    <p className="text-blue-700 leading-relaxed text-[11px]">{analysis.recommendation}</p>
                  </div>
                </div>

                {/* Description & Submit Form */}
                <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-5 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-900">Additional details (Optional)</label>
                    <textarea
                      placeholder="Tell the department more about the waste (e.g. blocking walkway, bad odor)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-24 p-3 rounded-xl border border-gray-200 bg-white/80 text-xs focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !address}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-primary font-bold text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Submit Report
                      </>
                    )}
                  </button>
                  {!address && (
                    <span className="text-[10px] text-red-500 flex items-center gap-1 justify-center mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Please detect location before submitting.
                    </span>
                  )}
                </form>
              </motion.div>
            ) : (
              <div className="glass-card rounded-3xl p-8 text-center text-gray-400 flex flex-col items-center justify-center min-h-[300px]">
                <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-sm font-medium">Upload a waste photo to see AI results</p>
                <p className="text-xs text-gray-300 max-w-xs mt-1">Our AI detects waste type, severity level, environmental impact, and auto-assigns the municipal department.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
        {showToast && (
          <div className="fixed bottom-5 right-5 z-50 p-4 bg-green-600 text-white rounded-2xl shadow-lg flex items-center gap-2 animate-bounce-subtle">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="text-xs font-bold">Report successfully saved to Firestore!</span>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
