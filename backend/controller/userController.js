const db = require('../model/connection');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    if(!name) {
        res.json({
            success: false,
            message: 'Missing name=',
        })
    }
    if (!email) {
    
        return res.json({
            success: false,
            message: 'Missing email',
        })
    }
    
    if (!password) {
        return res.json({
            success: false,
            message: 'Missing password',
        })
    }
    
    const { data: existingUser , error: checkoutError} = await db
        .from('user')
        .select()
        .eq('email', email)
        .single()
    
    if(existingUser) {
        return res.json({
            success: false,
            message: 'User already exists',
        })
    
    }
    
    const hashPassword = await bcrypt.hash(password, 10)
    const { data, error } = await db.from('user').insert([
        {
            name: name,
            email: email,
            password: hashPassword
        }
    ])


    // Jika berhasil menyimpan pengguna
    return res.json({
        success: true,
        message: 'Register successful',
    })
}




const loginUser = async (req, res) => {
    const { email, password } = req.body
    const { data, error } = await db
        .from('user')
        .select()
        .eq('email', email)
        .single()
    if (!data) {
        return res.json({
            success: false,
            message: 'User not found',
        })
    }
    const match = await bcrypt.compare(password, data.password)
    if (!match) {
        return res.json({
            success: false,
            message: 'Wrong password',
        })
    }
    return res.json({
        success: true,
        message: 'Login successful',
    })
    }



module.exports = {
    registerUser,
    loginUser
}