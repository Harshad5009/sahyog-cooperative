import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle, 
  Star, 
  QrCode, 
  Share2, 
  Download, 
  Calendar, 
  MapPin, 
  Users,
  ExternalLink
} from 'lucide-react';
import type { Worker } from '../../types';
import { Rating } from '../common/Rating';

interface SkillPassportCardProps {
  worker: Worker;
}

export const SkillPassportCard: React.FC<SkillPassportCardProps> = ({ worker }) => {
  return (
    <div className="bg-white rounded-3xl border border-surface-200 shadow-card overflow-hidden">
      {/* Top Federation Header */}
      <div className="bg-gradient-to-r from-coop-950 via-coop-900 to-emerald-950 text-white p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400/60 shadow-lg shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                  {worker.name}
                </h3>
                <span className="p-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <p className="text-xs text-emerald-300 font-semibold mt-0.5">
                {worker.primarySkill}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-surface-300">
                <span className="font-mono bg-coop-900 px-2 py-0.5 rounded border border-coop-700">
                  ID: {worker.membershipId}
                </span>
                <span>•</span>
                <span>Member since {worker.joiningYear}</span>
              </div>
            </div>
          </div>

          {/* QR Verification Badge with clickable verification link */}
          <Link
            to={`/verify/worker/${worker.membershipId}`}
            title="Scan or click to view official public verification certificate"
            className="bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md p-3 rounded-2xl border border-white/20 flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-white rounded-xl p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              {/* Simulated QR Pattern */}
              <div className="w-full h-full border-2 border-surface-900 rounded grid grid-cols-3 gap-0.5 p-0.5">
                <div className="bg-surface-900 rounded-xs" />
                <div className="bg-surface-300" />
                <div className="bg-surface-900 rounded-xs" />
                <div className="bg-surface-300" />
                <div className="bg-surface-900" />
                <div className="bg-surface-300" />
                <div className="bg-surface-900 rounded-xs" />
                <div className="bg-surface-300" />
                <div className="bg-surface-900 rounded-xs" />
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
              <span>Verified QR</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </Link>
        </div>
      </div>

      {/* Passport Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Cooperative Federation Accreditation */}
        <div className="p-4 bg-surface-50 rounded-2xl border border-surface-200 flex items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-surface-400 block">
              Registered Cooperative Society
            </span>
            <span className="font-bold text-surface-900 text-xs sm:text-sm">
              {worker.cooperativeSociety}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            Active Voting Member
          </span>
        </div>

        {/* 4 Core Vital Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-200 text-center">
            <span className="text-xl font-black text-surface-900 font-display block">
              {worker.experienceYears} Years
            </span>
            <span className="text-[11px] text-surface-500 font-medium">Industry Experience</span>
          </div>

          <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-200 text-center">
            <span className="text-xl font-black text-coop-950 font-display block">
              {worker.completedJobs}
            </span>
            <span className="text-[11px] text-surface-500 font-medium">Verified Completed Jobs</span>
          </div>

          <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-200 text-center">
            <span className="text-xl font-black text-amber-600 font-display block">
              {worker.rating} ★
            </span>
            <span className="text-[11px] text-surface-500 font-medium">{worker.totalReviews} Reviews</span>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
            <span className="text-xl font-black text-emerald-900 font-display block">
              {worker.reliabilityScore}%
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">Reliability Score</span>
          </div>
        </div>

        {/* Verified Skills & Proficiency Stars */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-3">
            Assessed Skill Competencies (NSDC Standard)
          </h4>
          <div className="space-y-2.5">
            {worker.skills.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-surface-50 rounded-xl border border-surface-200 text-xs"
              >
                <div>
                  <span className="font-bold text-surface-900 block">{s.name}</span>
                  <span className="text-[10px] text-surface-400">{s.experienceYears} Years Field Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < s.proficiency ? 'fill-amber-400 text-amber-400' : 'text-surface-300'
                        }`}
                      />
                    ))}
                  </div>
                  {s.certified && (
                    <span className="text-[10px] font-bold text-coop-800 bg-coop-100 px-1.5 py-0.5 rounded">
                      Certified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Government / Sector Certifications */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-3">
            Accredited Credentials & Licenses
          </h4>
          <div className="space-y-2.5">
            {worker.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-3.5 bg-white rounded-xl border border-coop-200 shadow-xs flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-coop-50 text-coop-700 mt-0.5 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-surface-900">{cert.name}</h5>
                    <p className="text-[11px] text-surface-500">Issuer: {cert.issuer}</p>
                    <p className="text-[10px] text-surface-400 mt-0.5">Issued: {cert.issueDate}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 shrink-0">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Passport Footer Actions */}
        <div className="pt-4 border-t border-surface-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-surface-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cryptographically sealed by Maharashtra Cooperative Federation.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.open(`/verify/worker/${worker.membershipId}`, '_blank');
              }}
              className="px-3.5 py-1.5 bg-surface-100 hover:bg-surface-200 text-surface-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Verify / Export PDF</span>
            </button>
            <button
              onClick={() => {
                const url = `${window.location.origin}/verify/worker/${worker.membershipId}`;
                navigator.clipboard.writeText(url);
                alert(`Public verification credential link copied to clipboard:\n${url}`);
              }}
              className="px-3.5 py-1.5 bg-coop-900 hover:bg-coop-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Credential</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
