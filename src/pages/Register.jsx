// src/pages/Register.jsx
// Faculty Registration Page — split-screen layout with animated form

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatInput from "../components/FloatInput";
import GradientButton from "../components/GradientButton";
import BrandPanel from "../components/BrandPanel";
import { ToastContainer, useToast } from "../components/Toast";
import { validateRegister, getPasswordStrength } from "../utils/validate";
import { registerFaculty } from "../utils/api";

// Departments offered
const DEPARTMENTS = [
  { value: "CSE",   label: "Computer Science & Engineering" },
  { value: "ECE",   label: "Electronics & Communication" },
  { value: "MECH",  label: "Mechanical Engineering" },
  { value: "CIVIL", label: "Civil Engineering" },
  { value: "IT",    label: "Information Technology" },
  { value: "EEE",   label: "Electrical & Electronics" },
  { value: "MBA",   label: "Business Administration" },
  { value: "MCA",   label: "Computer Applications" },
  { value: "OTHER", label: "Other" },
];

export default function Register() {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  // Form state
  const [form, setForm] = useState({
    name:            "",
    email:           "",
    password:        "",
    confirmPassword: "",
    department:      "",
  });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  // Generic change handler
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Password strength
  const pwdStrength = form.password ? getPasswordStrength(form.password) : null;

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errs = validateRegister(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      addToast("Please fix the errors below.", "error");
      return;
    }

    setLoading(true);

    // ---- Backend integration ----
    // Uncomment to call Java Servlet API:
    // const result = await registerFaculty({
    //   name: form.name,
    //   email: form.email,
    //   password: form.password,
    //   department: form.department,
    // });
    // if (!result.ok) {
    //   setLoading(false);
    //   addToast(result.error, "error");
    //   return;
    // }

    // Simulated success (remove when using real API)
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);

    addToast("Account created! Redirecting to login…", "success");
    setTimeout(() => navigate("/login"), 1800);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Full-screen split layout */}
      <div className="min-h-screen bg-[#0f0a1e] flex">

        {/* Left — brand */}
        <div className="lg:w-5/12 xl:w-1/2 bg-mesh">
          <BrandPanel />
        </div>

        {/* Right — form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden animate-fade-in">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-white text-sm">Student Event Manager</span>
            </div>

            {/* Header */}
            <div className="mb-8 animate-slide-up anim-hidden">
              <h2 className="font-display text-3xl font-bold text-white">Create account</h2>
              <p className="text-white/40 mt-1.5 text-sm">Join as a faculty member to get started.</p>
            </div>

            {/* Form card */}
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl border border-white/8 p-8 space-y-5 shadow-card animate-slide-up anim-hidden delay-100"
              noValidate
            >
              {/* Name */}
              <FloatInput
                label="Full Name"
                type="text"
                value={form.name}
                onChange={handleChange("name")}
                error={errors.name}
                name="name"
                autoComplete="name"
                required
                
              />

              {/* Email */}
              <FloatInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                error={errors.email}
                name="email"
                autoComplete="email"
                required
                
              />

              {/* Password */}
              <div className="space-y-1.5">
                <FloatInput
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={handleChange("password")}
                  error={errors.password}
                  name="password"
                  autoComplete="new-password"
                  required
                />
                {/* Strength meter */}
                {pwdStrength && (
                  <div className="px-1">
                    <div className="flex gap-1 h-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            i <= pwdStrength.level ? pwdStrength.color : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-white/40 mt-1">
                      Strength: <span className="text-white/70">{pwdStrength.label}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <FloatInput
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={errors.confirmPassword}
                name="confirmPassword"
                autoComplete="new-password"
                required
              />

              {/* Department */}
              <FloatInput
                label="Department"
                type="select"
                value={form.department}
                onChange={handleChange("department")}
                error={errors.department}
                name="department"
                options={DEPARTMENTS}
                required
              />

              {/* Submit */}
              <GradientButton type="submit" loading={loading} className="w-full mt-2">
                {loading ? "Creating account…" : "Create Account"}
              </GradientButton>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-white/40 mt-6 animate-fade-in delay-300">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 hover:text-violet-200 transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
