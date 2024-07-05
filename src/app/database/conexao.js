import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    //password: '105Denis',
    password: '',
    database: 'jogodavelha'
})

conexao.connect()

export default conexao