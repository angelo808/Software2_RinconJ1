const nodemailer = require('nodemailer');
const cron = require('node-cron');

const passkey = 'wtzy bdqh fizm gmsp'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'elrincondelj1@gmail.com',
    pass: passkey
  }
});

const sendEmail = (to, subject, text) => {

  
  const mailOptions = {
    from: 'elrincondelj1@gmail.com',
    to: to,
    subject: subject,
    text: text
  };
  
  return transporter.sendMail(mailOptions);
};

const scheduleEmail = (event) => {
  const eventDate = new Date(event.date);
  const startHour = new Date(event.startHour);
  const reminderTime = new Date(startHour.getTime() - 10 * 60000); // 10 minutos antes

  if (reminderTime > new Date()) {
    const cronExpression = `${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${reminderTime.getMonth() + 1} *`;

    cron.schedule(cronExpression, () => {
      const subject = 'Recordatorio de Evento';
      const text = `Hola, tienes un evento llamado "${event.name}" programado para el día ${event.date} desde las ${event.startHour} hasta las ${event.endHour}.`;

      sendEmail(event.email, subject, text)
        .then(() => {
          console.log('Correo enviado correctamente');
        })
        .catch((error) => {
          console.error('Error al enviar el correo:', error);
        });
    }, {
      scheduled: true,
      timezone: "America/Lima" // Ajusta según tu zona horaria
    });
  }
};

module.exports = { sendEmail, scheduleEmail };
