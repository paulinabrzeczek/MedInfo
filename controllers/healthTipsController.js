function getHealthTipsPage(req, res) {
    const tips = [
        { tip: 'Pij dużo wody, aby utrzymać odpowiedni poziom nawodnienia organizmu.' },
        { tip: 'Dbaj o regularną aktywność fizyczną, co najmniej 30 minut dziennie.' },
        { tip: 'Unikaj stresu i staraj się znaleźć czas na relaks i regenerację.' }
    ];
    res.render('healthTips', { title: 'Porady Zdrowotne', tips });
}

module.exports = { getHealthTipsPage };
