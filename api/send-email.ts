import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
      user: 'bhgeducationconsult',
      pass: process.env.SMTP2GO_PASSWORD ?? 'eOjO3OfKFDUEtEOL',
    },
  });
}

const FROM = '"B.H.G Education Consult" <info@bhgeducationconsult.com>';
const BUSINESS_EMAIL = 'info@bhgeducationconsult.com';

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #F0EBE0;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:2px;width:40%;font-family:Arial,sans-serif;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #F0EBE0;color:#001F3F;font-weight:bold;font-family:Georgia,serif;">${value || '—'}</td>
  </tr>`;
}

function wrap(title: string, subtitle: string, body: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:20px;background:#F5F1E9;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;background:#FDFCFB;border:1px solid #C5A059;border-radius:12px;overflow:hidden;">
    <div style="background:#001F3F;padding:32px;text-align:center;">
      <h1 style="color:#C5A059;font-size:22px;margin:0;letter-spacing:1px;">${title}</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:10px;letter-spacing:4px;margin:8px 0 0;text-transform:uppercase;">${subtitle}</p>
    </div>
    <div style="padding:32px;">${body}</div>
    <div style="background:#F5F1E9;padding:20px;text-align:center;border-top:1px solid #C5A059;">
      <p style="color:#999;font-size:10px;letter-spacing:2px;text-transform:uppercase;margin:0;">© ${new Date().getFullYear()} By His Grace Education Consult · Unique Elegance</p>
    </div>
  </div></body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { formType, data } = req.body ?? {};
  if (!formType || !data) return res.status(400).json({ error: 'Invalid request' });

  let businessSubject = '';
  let businessBody = '';
  let serviceName = '';
  const applicantName: string = data.fullName ?? data.studentName ?? 'Applicant';

  if (formType === 'bece') {
    serviceName = 'BECE Private Registration';
    businessSubject = `New BECE Registration — ${applicantName}`;
    businessBody = `
      <h2 style="color:#001F3F;font-size:18px;border-bottom:2px solid #C5A059;padding-bottom:10px;margin-top:0;">BECE Private Registration</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Full Name', data.fullName)}
        ${row('Gender', data.gender)}
        ${row('Phone', data.phone)}
        ${row('Email', data.email)}
        ${row('Previous School', data.previousSchool)}
        ${row('Current Class', data.currentClass)}
        ${row('Subjects', Array.isArray(data.subjects) ? data.subjects.join(', ') : String(data.subjects ?? '—'))}
      </table>`;
  } else if (formType === 'home-tuition') {
    serviceName = 'Home Tuition Request';
    businessSubject = `New Home Tuition Request — ${applicantName}`;
    businessBody = `
      <h2 style="color:#001F3F;font-size:18px;border-bottom:2px solid #C5A059;padding-bottom:10px;margin-top:0;">Home Tuition Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Student's Name", data.studentName)}
        ${row("Student's Gender", data.studentGender)}
        ${row('Phone', data.phone)}
        ${row('Email', data.email)}
        ${row('Teacher Preference', data.teacherGender)}
        ${row('Location', data.location)}
        ${row('No. of Subjects', data.numSubjects)}
        ${row('Notes', data.notes || 'None')}
      </table>`;
  } else if (formType === 'online-tuition') {
    serviceName = 'Online Virtual Tuition';
    businessSubject = `New Online Tuition Application — ${applicantName}`;
    businessBody = `
      <h2 style="color:#001F3F;font-size:18px;border-bottom:2px solid #C5A059;padding-bottom:10px;margin-top:0;">Online Tuition Application</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Full Name', data.fullName)}
        ${row('Age', data.age)}
        ${row('Gender', data.gender)}
        ${row('Class / Grade', data.currentClass)}
        ${row('School', data.school)}
        ${row('Phone / WhatsApp', data.phone)}
        ${row('Email', data.email)}
      </table>`;
  } else {
    return res.status(400).json({ error: 'Unknown form type' });
  }

  const applicantBody = `
    <p style="color:#001F3F;font-size:16px;">Dear <strong>${applicantName}</strong>,</p>
    <p style="color:#555;line-height:1.7;font-size:15px;">Thank you for submitting your <strong>${serviceName}</strong> application with B.H.G Education Consult.</p>
    <div style="background:#F5F1E9;border-left:3px solid #C5A059;padding:16px 20px;margin:24px 0;border-radius:0 8px 8px 0;">
      <p style="margin:0;color:#001F3F;font-weight:bold;font-size:13px;text-transform:uppercase;letter-spacing:2px;">Application Status</p>
      <p style="margin:8px 0 0;color:#555;font-size:14px;">Your application is currently <strong>under review</strong> by our administration. You will be contacted once your admission has been officially confirmed.</p>
    </div>
    <p style="color:#555;font-size:14px;">If you have any questions in the meantime, please reach out:</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row('Phone', '0205103678 / 0555284520')}
      ${row('Email', 'info@bhgeducationconsult.com')}
    </table>
    <p style="color:#C5A059;font-style:italic;font-size:14px;margin-top:24px;">"Unique Elegance" — By His Grace Education Consult</p>`;

  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: FROM,
      to: BUSINESS_EMAIL,
      subject: businessSubject,
      html: wrap('B.H.G Education Consult', 'New Application Received', businessBody),
    });

    if (data.email) {
      await transporter.sendMail({
        from: FROM,
        to: data.email as string,
        replyTo: 'info@bhgeducationconsult.com',
        subject: 'Your B.H.G Education Application is Under Review',
        html: wrap('B.H.G Education Consult', 'Application Confirmation', applicantBody),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }
}
