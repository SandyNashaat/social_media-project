module.exports = function (req, res){
    
    res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.json({ message: 'Logged out successfully' });

}