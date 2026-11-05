'use server';

import { dbConnect } from './dbConnect';
import Certificate from './models/Certificate';

export async function verifyCertificate(referenceNumber) {
  try {
    if (!referenceNumber || typeof referenceNumber !== 'string') {
      return { success: false, error: 'Please provide a valid reference number.' };
    }

    await dbConnect();
    
    const cleanRef = referenceNumber.trim().toUpperCase();
    const cert = await Certificate.findOne({ reference_number: cleanRef }).lean();

    if (!cert) {
      return { success: false, error: 'No certificate matching this reference number was found.' };
    }

    // Convert BSON Mongo data to plain JavaScript object for React
    return {
      success: true,
      data: {
        ...cert,
        _id: cert._id.toString(),
        issue_date: new Date(cert.issue_date).toISOString(),
        created_at: new Date(cert.created_at).toISOString(),
      },
    };
  } catch (err) {
    console.error('Database query error:', err);
    return { success: false, error: 'Internal Server Error. Please try again later.' };
  }
}