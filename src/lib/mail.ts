import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendPasswordResetEmail = async (email: string, resetLink: string) => {
    const mailOptions = {
        from: `"Atlas Security" <${process.env.SMTP_USER || 'devhacksender@gmail.com'}>`,
        to: email,
        subject: 'Reset Your Atlas Password',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #7c3aed; text-align: center;">Atlas Password Reset</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password for your Atlas Employee account. Click the button below to set a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>This link will expire in 1 hour.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">Powered by Redlix</p>
            </div>
        `,
    };

    return await transporter.sendMail(mailOptions);
};
