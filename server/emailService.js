import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

// Booking confirmation email template
export const sendBookingConfirmation = async (booking) => {
  try {
    // Calculate nights
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    const mailOptions = {
      from: '"ParadiseLankaStay" <' + process.env.EMAIL_USER + '>',
      to: booking.customerEmail,
      subject: '🎉 Booking Confirmed - ParadiseLankaStay',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white; 
              padding: 30px; 
              text-align: center; 
              border-radius: 10px 10px 0 0;
            }
            .content { 
              background: #f9f9f9; 
              padding: 30px; 
              border-radius: 0 0 10px 10px;
            }
            .booking-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              font-weight: bold;
              color: #555;
            }
            .detail-value {
              color: #333;
            }
            .total {
              font-size: 18px;
              font-weight: bold;
              color: #28a745;
              text-align: right;
              margin-top: 15px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #888;
              font-size: 12px;
            }
            .hotel-name {
              font-size: 24px;
              color: #667eea;
              margin-bottom: 10px;
            }
            .booking-id {
              background: #f0f0f0;
              padding: 8px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
              <p>Your stay at ParadiseLankaStay is confirmed</p>
            </div>
            
            <div class="content">
              <p>Dear <strong>${booking.customerName}</strong>,</p>
              <p>Thank you for choosing ParadiseLankaStay! Your booking has been successfully confirmed.</p>
              
              <div class="booking-details">
                <div class="hotel-name">${booking.hotelName}</div>
                <div class="booking-id">Booking ID: ${booking._id}</div>
                
                <div class="detail-row">
                  <span class="detail-label">Room Type:</span>
                  <span class="detail-value">${booking.roomName} (${booking.roomType})</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Check-in:</span>
                  <span class="detail-value">${new Date(booking.checkIn).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Check-out:</span>
                  <span class="detail-value">${new Date(booking.checkOut).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Nights:</span>
                  <span class="detail-value">${nights} night${nights > 1 ? 's' : ''}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Guests:</span>
                  <span class="detail-value">${booking.guests} guest${booking.guests > 1 ? 's' : ''}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Price per night:</span>
                  <span class="detail-value">Rs. ${booking.pricePerNight}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">${booking.customerPhone}</span>
                </div>
                
                <div class="total">
                  Total Amount: Rs. ${booking.totalAmount}
                </div>
              </div>
              
              <div style="text-align: center;">
                <a href="http://localhost:3000/mybookings" class="button">View My Bookings</a>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 8px;">
                <h3 style="color: #0056b3; margin-top: 0;">📍 Hotel Contact Information</h3>
                <p><strong>Address:</strong> ${booking.hotelName}, Paradise Lanka</p>
                <p><strong>Emergency Contact:</strong> +94 77 123 4567</p>
                <p><strong>Email:</strong> info@paradiselankastay.com</p>
              </div>
              
              <div style="margin-top: 20px;">
                <h3 style="color: #333;">📋 Important Information:</h3>
                <ul style="color: #666;">
                  <li>Check-in time: 2:00 PM</li>
                  <li>Check-out time: 12:00 PM</li>
                  <li>Please bring a valid ID and your booking confirmation</li>
                  <li>For cancellations or changes, please contact us 48 hours in advance</li>
                </ul>
              </div>
              
              <p style="margin-top: 20px;">We look forward to welcoming you!</p>
              <p>Warm regards,<br><strong>ParadiseLankaStay Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2024 ParadiseLankaStay. All rights reserved.</p>
              <p>This is an automated email, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};