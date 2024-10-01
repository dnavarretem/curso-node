const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {

  socket.emit('ultimo-ticket', ticketControl.ultimo);
  socket.emit('estado-actual', ticketControl.ultimos4);

  // tickets-pendientes
  socket.emit('tickets-pendientes', ticketControl.tickets.length);


  socket.on('siguiente-ticket', (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
  });

  socket.on('atender-ticket', ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: 'El escritorio es obligatorio'
      })
    }

    const ticket = ticketControl.atenderTicket(escritorio);

    // Notificar cambio ultimos 4
    socket.broadcast.emit('estado-actual', ticketControl.ultimos4);    

    socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    if (!ticket) {
      return callback({
        ok: false,
        msg: 'Ya no hay tickets'
      })
    } else {
      return callback({
        ok: true,
        ticket
      })
    }
  })

}



module.exports = {
  socketController
}

