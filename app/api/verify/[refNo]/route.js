import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/dbConnect';
import Certificate from '../../../lib/models/Certificate';

export async function GET(request, { params }) {
  try {
    const { refNo } = await params;
    if (!refNo) {
      return NextResponse.json({ success: false, error: 'Reference number is required' }, { status: 400 });
    }

    await dbConnect();
    const cert = await Certificate.findOne({ reference_number: refNo.trim().toUpperCase() }).lean();

    if (!cert) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...cert,
        _id: cert._id.toString(),
        issue_date: new Date(cert.issue_date).toISOString(),
        created_at: new Date(cert.created_at).toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}