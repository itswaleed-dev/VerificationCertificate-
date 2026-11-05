import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  reference_number: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true,
  },
  student_name: { type: String, required: true },
  course_title: { type: String, required: true },
  issue_date: { type: Date, required: true },
  grade_or_score: { type: String, required: true },
  certificate_status: {
    type: String,
    enum: ['VALID', 'EXPIRED', 'REVOKED'],
    default: 'VALID',
  },
  issuing_authority: { type: String, default: 'Waleed Brothers' },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema, 'Certificate');