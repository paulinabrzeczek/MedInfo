function getAboutPage(req, res) {
    res.render('about', { title: 'O Nas', content: 'MediInfo to aplikacja, która pomoże Ci w zarządzaniu informacjami o lekach, zdrowiu oraz kalkulatorach zdrowotnych. Naszym celem jest dostarczenie rzetelnych informacji na temat leków, ich producentów oraz kategorii, a także pomoc w dbaniu o zdrowie poprzez praktyczne narzędzia, takie jak kalkulatory BMI i BMR.'
    });}

module.exports = { getAboutPage };
