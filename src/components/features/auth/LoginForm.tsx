import React, { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react';
import { loginUser } from '../../../services/api';
import { User } from '../../../types';

interface LoginFormProps {
  onSuccess: (token: string, user: User) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      onSuccess(res.token, res.user);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@lifepassport.ai');
    setPassword('demo123456');
    setLoading(true);
    setError(null);
    try {
      // Register or login demo account
      const res = await loginUser({ email: 'demo@lifepassport.ai', password: 'demo123456' }).catch(() => {
        return null;
      });
      if (res) {
        onSuccess(res.token, res.user);
      } else {
        // Switch to register demo account if not exists
        setError('Demo user not found. Please click Register to create your account.');
      }
    } catch (err: any) {
      setError('Demo login error. Please register a new account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-3 text-indigo-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
        <p className="text-xs text-slate-400 mt-1">Sign in to discover your Top 5 AI Personalized Opportunities</p>
      </div>

      {error && (
        <div className="mb-6 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 flex items-center gap-2 text-rose-300 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-indigo-400 hover:text-indigo-300 font-bold underline"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};
