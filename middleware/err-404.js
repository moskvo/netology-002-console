module.exports = (req, res) => {
    res.status(404);
    res.json({errcode: 404, errmsg: 'страница не найдена'})
}