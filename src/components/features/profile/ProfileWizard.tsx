import React, { useState } from 'react';
import { User as UserIcon, Save, Sparkles, Check, MapPin, Briefcase, GraduationCap, DollarSign, Globe, Award } from 'lucide-react';
import { updateProfile } from '../../../services/api';
import { User } from '../../../types';

interface ProfileWizardProps {
  user: User;
  onUpdateSuccess: (updatedUser: User) => void;
}

export const ProfileWizard: React.FC<ProfileWizardProps> = ({ user, onUpdateSuccess }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name || '',
    age: user.age || 22,
    gender: user.gender || 'Male',
    education: user.education || 'Undergraduate',
    occupation: user.occupation || 'Student',
    annualIncome: user.annualIncome || 'Below 2.5 Lakhs',
    state: user.state || 'Delhi',
    district: user.district || 'New Delhi',
    preferredLanguage: user.preferredLanguage || 'English',
    skills: user.skills || 'Computer Basics, English Communication'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await updateProfile(formData);
      onUpdateSuccess(res.user);
      setSuccessMsg('Profile updated! Gemini AI will now recalculate your personalized recommendations.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white">Your Profile Credentials</h2>
          </div>
          <p className="text-xs text-slate-400">
            Gemini AI uses these exact details to match you with top Indian Government opportunities.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 text-xs font-semibold text-indigo-300">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>AI Matching Active</span>
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3 text-emerald-300 text-xs font-semibold">
          <Check className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-rose-300 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Age (Years)</label>
            <input
              type="number"
              required
              min="10"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 18 })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Other">Other / Prefer not to say</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Education Qualification</span>
            </label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            >
              <option value="Below 10th Standard">Below 10th Standard</option>
              <option value="10th Pass (SSC)">10th Pass (SSC)</option>
              <option value="12th Pass (HSC)">12th Pass (HSC)</option>
              <option value="Diploma / ITI">Diploma / ITI Certification</option>
              <option value="Undergraduate (B.Tech / B.Sc / B.A / B.Com)">Undergraduate (B.Tech / B.Sc / B.A / B.Com)</option>
              <option value="Postgraduate (M.Tech / M.Sc / M.A / M.Com)">Postgraduate (M.Tech / M.Sc / M.A / M.Com)</option>
              <option value="Ph.D / Post-Doctoral">Ph.D / Post-Doctoral Scholar</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Current Occupation</span>
            </label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            >
              <option value="Student">Student</option>
              <option value="Self-Employed / Entrepreneur">Self-Employed / Entrepreneur</option>
              <option value="Street Vendor / Micro-business">Street Vendor / Micro-business</option>
              <option value="Salaried Employee (Private Sector)">Salaried Employee (Private Sector)</option>
              <option value="Farmer / Agricultural Laborer">Farmer / Agricultural Laborer</option>
              <option value="Traditional Artisan / Craftsperson">Traditional Artisan / Craftsperson</option>
              <option value="Unemployed Job Seeker">Unemployed Job Seeker</option>
              <option value="Homemaker">Homemaker</option>
            </select>
          </div>

          {/* Annual Income */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
              <span>Annual Family Income</span>
            </label>
            <select
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            >
              <option value="Below 1.0 Lakh">Below ₹1.0 Lakh / annum (EWS)</option>
              <option value="Below 2.5 Lakhs">Below ₹2.5 Lakhs / annum</option>
              <option value="₹2.5 Lakhs - ₹5.0 Lakhs">₹2.5 Lakhs - ₹5.0 Lakhs / annum</option>
              <option value="₹5.0 Lakhs - ₹8.0 Lakhs">₹5.0 Lakhs - ₹8.0 Lakhs / annum</option>
              <option value="Above ₹8.0 Lakhs">Above ₹8.0 Lakhs / annum</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>State / Union Territory</span>
            </label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="e.g. Maharashtra, Uttar Pradesh, Tamil Nadu"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">District</label>
            <input
              type="text"
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              placeholder="e.g. Pune, Lucknow, Chennai"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Preferred Language</span>
            </label>
            <select
              value={formData.preferredLanguage}
              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
              <option value="Marathi">Marathi (मराठी)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Gujarati">Gujarati (ગુજરાતી)</option>
              <option value="Kannada">Kannada (கன்னட)</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Key Skills / Interests</span>
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="e.g. IT, Tailoring, Agriculture, Solar Tech, Welding"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Updating Profile...' : 'Save & Refresh Recommendations'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
