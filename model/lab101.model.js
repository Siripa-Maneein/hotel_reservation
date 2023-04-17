const sql = require('mssql')
require('dotenv').config()
const string_connection = `Server=${process.env.DB_SERVER},${process.env.DB_PORT};Database=${process.env.DB_NAME};User Id=${process.env.DB_USER};Password=${process.env.DB_PWD};Encrypt=false`;

const searchCustomer = async(res) => {
    try {
    
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        const result = await request.query('select * from customer');
        //console.log(string_connection);
        // console.log(result);
        return result;

    }
    catch (err) {
        console.log(string_connection);
        res.status(500).send('Error connecting to the database');

    } finally {
        // Close the database connection
        sql.close();
    }
}

const insertCustomer = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log(playload)
  
        const result = await request.input('customer_id', sql.Int, playload.customer_id).
        input('firstname', sql.NVarChar, playload.firstname).
        input('lastname', sql.NVarChar, playload.lastname).
        input('email', sql.NVarChar, playload.email).
        input('phone', sql.NVarChar, playload.phone).
       
        query('insert into dbo.customer (customer_id, firstname, lastname, email, phone) \
        values(@customer_id,@firstname,@lastname,@email,@phone)');
  
        console.log('Rows affected:', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
    }
    catch (err) {
        res.status(500).send(err);
  
    } finally {
        // Close the database connection
        sql.close();
    }
  }

  const updateCustomer = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log(playload)
        const result = await request.input('customer_id', sql.Int, playload.customer_id).
        input('firstname', sql.NVarChar, playload.firstname).
        input('lastname', sql.NVarChar, playload.lastname).
        input('email', sql.NVarChar, playload.email).
        input('phone', sql.NVarChar, playload.phone).

        query('update dbo.customer set firstname=@firstname, lastname=@lastname, \
        email=@email, phone=@phone where customer_id=@customer_id');

        console.log('Result: ', result.rowsAffected[0]);
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}

  const deleteCustomer = async(res,customer_id) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log("delete customer_id:"+customer_id)
        const result = await request.input('customer_id', sql.Int,customer_id).
        query('delete from dbo.customer where customer_id=@customer_id');

        console.log('Result: ', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}

const searchRoom = async(res) => {

    try {
        
        //console.log("string_connection :"+string_connection)
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);

        const result = await request.query('select * from Room');
        return result;

    }

    catch (err) {
        res.status(500).send('Error connecting to the database');

    } finally {
        // Close the database connection
        sql.close();
    }
}

const insertRoom = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);

        const result = await request.input('room_id', sql.Int, playload.room_id).
        input('type_id', sql.Int, playload.type_id).
        query('insert into dbo.Room (room_id,type_id) \
        values(@room_id,@type_id)');

        console.log('Rows affected:', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}

const updateRoom = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log(playload)
        const result = await request.input('room_id', sql.Int, playload.room_id).
        input('type_id', sql.Int, playload.type_id).
        query('update dbo.Room set type_id=@type_id where room_id=@room_id\
        ');
        console.log('Result: ', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}


const deleteRoom = async(res,room_id) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log("delete room_id:"+room_id)
        const result = await request.input('room_id', sql.Int,room_id).
        query('delete from dbo.Room where room_id=@room_id');
        console.log('Result: ', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}


const searchReservation = async(res) => {

    try {
        
        //console.log("string_connection :"+string_connection)
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);

        const result = await request.query('select * from Reservation');
        return result;

    }

    catch (err) {
        res.status(500).send('Error connecting to the database');

    } finally {
        // Close the database connection
        sql.close();
    }
}

const insertReservation = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
  
        const result = await request.input('reservation_id', sql.Int, playload.reservation_id).
        input('customer_id', sql.Int, playload.customer_id).
        input('num_guests', sql.Int, playload.num_guests).
        input('check_in_date', sql.Date, playload.check_in_date).
        input('check_out_date', sql.Date, playload.check_out_date).
        input('total_amount', sql.Int, playload.total_amount).
        input('transaction_datetime', sql.DateTime, playload.transaction_datetime).
        input('account_name', sql.NVarChar, playload.account_name).
        input('payment_status', sql.NVarChar, playload.payment_status).
        
       
        query('insert into dbo.reservation (reservation_id,customer_id, num_guests, check_in_date, check_out_date, total_amount, transaction_datetime, account_name, payment_status) \
        values(@reservation_id,@customer_id,@num_guests, @check_in_date, @check_out_date,  @total_amount, @transaction_datetime, @account_name, @payment_status)');
  
        console.log('Rows affected:', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
    }
    catch (err) {
        res.status(500).send(err);
  
    } finally {
        // Close the database connection
        sql.close();
    }
}
  


const updateReservation = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log(playload)
        const result = await request.input('reservation_id', sql.Int, playload.reservation_id).
        input('customer_id', sql.Int, playload.customer_id).
        input('num_guests', sql.Int, playload.num_guests).
        input('check_in_date', sql.Date, playload.check_in_date).
        input('check_out_date', sql.Date, playload.check_out_date).
        input('total_amount', sql.Int, playload.total_amount).
        input('transaction_datetime', sql.DateTime, playload.transaction_datetime).
        input('account_name', sql.NVarChar, playload.account_name).
        input('payment_status', sql.NVarChar, playload.payment_status).
        
        query('update dbo.Reservation set customer_id=@customer_id, num_guests=@num_guests, check_in_date=@check_in_date, check_out_date=@check_out_date,  total_amount=@total_amount, transaction_datetime=@transaction_datetime, account_name=@account_name, payment_status=@payment_status where reservation_id=@reservation_id\
        ');
        console.log('Result: ', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}


const deleteReservation = async(res,reservation_id) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log("delete reservation_id:"+reservation_id)
        const result = await request.input('reservation_id', sql.Int,reservation_id).
        query('delete from dbo.Reservation where reservation_id=@reservation_id');

        console.log('Result: ', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}
const searchType = async(res) => {

    try {
        
        //console.log("string_connection :"+string_connection)
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);

        const result = await request.query('select * from Type');
        return result;

    }

    catch (err) {
        res.status(500).send('Error connecting to the database');

    } finally {
        // Close the database connection
        sql.close();
    }
}

const insertType = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);

        const result = await request.input('type_id', sql.NVarChar, playload.type_id).
        input('type_name', sql.NVarChar, playload.type_name).
        input('num_beds', sql.NVarChar, playload.num_beds).
        input('max_guests', sql.NVarChar, playload.max_guests).
        input('price', sql.NVarChar, playload.price).
        query('insert into dbo.Type (type_id,type_name,num_beds,max_guests,price) \
        values(@type_id,@type_name,@num_beds,@max_guests,@price)');

        console.log('Rows affected:', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}

const updateType = async(res,playload) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log(playload)
        const result = await request.input('type_id', sql.NVarChar, playload.type_id).
        input('type_name', sql.NVarChar, playload.type_name).
        input('num_beds', sql.NVarChar, playload.num_beds).
        input('max_guests', sql.NVarChar, playload.max_guests).
        input('price', sql.NVarChar, playload.price).
        query('update dbo.Type set type_name = @type_name,num_beds = @num_beds\
        ,max_guests = @max_guests,price=@price where type_id=@type_id');
        console.log('Result: ', result.rowsAffected[0]);
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}


const deleteType = async(res,type_id) => {

    try {
        
        let con = await sql.connect(string_connection)
        let request = new sql.Request(con);
        console.log("delete type_id:"+type_id)
        const result = await request.input('type_id', sql.NVarChar,type_id).
        query('delete from dbo.Type where type_id=@type_id');
        console.log('Result: ', result.rowsAffected[0]);
        
        return result.rowsAffected[0];
        
    }

    catch (err) {
        res.status(500).send(err);

    } finally {
        // Close the database connection
        sql.close();
    }
}


module.exports = {
    searchReservation,insertReservation,
    updateReservation,deleteReservation,
    searchRoom,insertRoom,
    updateRoom,deleteRoom, 
    searchType,insertType,
    updateType,deleteType,
    searchCustomer,insertCustomer,
    updateCustomer,deleteCustomer
    }
