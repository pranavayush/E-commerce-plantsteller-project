import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Leaf, ShieldCheck, Mail, KeyRound, Smartphone, Activity } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { login } = useAppContext();
  const navigate = useNavigate();

  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      toast.success("Password reset link sent to your email.");
      setMode('login');
      return;
    }
    
    // Simulate moving to OTP step
    setStep('otp');
    toast.info("Security code sent to your registered device/email.");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email.includes('admin') ? 'admin' : 'user';
    login(email, role);
    
    if (mode === 'signup') {
      toast.success("Account verified and created successfully!");
    } else {
      toast.success("Authentication successful. Welcome back!");
    }
    
    navigate('/dashboard');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-4 rounded-2xl shadow-xl shadow-emerald-500/20">
            {step === 'otp' ? <ShieldCheck className="w-8 h-8 text-white" /> : <Leaf className="w-8 h-8 text-white" />}
          </div>
        </motion.div>
        <h2 className="text-center text-3xl font-serif font-bold text-neutral-900 dark:text-white">
          {step === 'otp' ? 'Two-Factor Auth' : mode === 'login' ? 'Secure Login' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
          {step === 'otp' 
            ? 'Enter the 6-digit verification code sent to your device' 
            : mode === 'login' 
              ? 'Protected by enterprise-grade security' 
              : mode === 'signup' 
                ? 'Join PlantSteller with a secure account' 
                : 'Enter your email to receive a secure reset link'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-emerald-500/5 sm:rounded-[2rem] sm:px-10 border border-neutral-200/50 dark:border-neutral-800/50"
        >
          <AnimatePresence mode="wait">
            {step === 'credentials' ? (
              <motion.form 
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6" 
                onSubmit={handleCredentialsSubmit}
              >
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="appearance-none block w-full px-4 py-3.5 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-3.5 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <KeyRound className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full pl-10 pr-3 py-3.5 border border-neutral-300 dark:border-neutral-700 rounded-xl shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    {mode === 'signup' && password.length > 0 && (
                      <div className="mt-2 flex items-center space-x-1">
                        <div className={`h-1.5 flex-1 rounded-full ${password.length > 3 ? 'bg-red-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${password.length > 6 ? 'bg-amber-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${password.length > 8 && /[A-Z]/.test(password) ? 'bg-emerald-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
                      </div>
                    )}
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                        Remember device
                      </label>
                    </div>

                    <div className="text-sm">
                      <button type="button" onClick={() => setMode('forgot')} className="font-bold text-emerald-600 hover:text-emerald-500">
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/30 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all hover:-translate-y-0.5"
                  >
                    {mode === 'login' ? 'Continue securely' : mode === 'signup' ? 'Create Secure Account' : 'Send Reset Link'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
                onSubmit={handleOtpSubmit}
              >
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-start space-x-3 mb-6">
                  <Smartphone className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="text-sm text-neutral-700 dark:text-neutral-300">
                    A verification code has been sent to your registered email/device. This code will expire in 10 minutes.
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-neutral-900 dark:text-white"
                    />
                  ))}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={otp.some(d => !d)}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/30 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Verify & Authenticate
                  </button>
                </div>
                
                <div className="text-center text-sm">
                  <button type="button" className="font-bold text-emerald-600 hover:text-emerald-500">
                    Resend Code
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center text-sm text-neutral-500">
            {step === 'credentials' && (
              <>
                {mode === 'login' ? (
                  <p>Don't have an account? <button onClick={() => setMode('signup')} className="text-emerald-600 font-bold hover:underline">Sign up</button></p>
                ) : mode === 'signup' ? (
                  <p>Already have an account? <button onClick={() => setMode('login')} className="text-emerald-600 font-bold hover:underline">Sign in</button></p>
                ) : (
                  <p>Remembered your password? <button onClick={() => setMode('login')} className="text-emerald-600 font-bold hover:underline">Sign in</button></p>
                )}
              </>
            )}
            
            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-center items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs font-medium text-neutral-400">
                <ShieldCheck className="w-4 h-4" /> <span>256-bit Encrypted</span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-medium text-neutral-400">
                <Activity className="w-4 h-4" /> <span>Active Monitoring</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
