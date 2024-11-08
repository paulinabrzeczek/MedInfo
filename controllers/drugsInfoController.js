function showMedicineInfo(req, res) {
    console.log('Renderowanie strony /drugs-info');  // Logowanie, aby zobaczyć, czy funkcja jest wywoływana
    res.render('drugsInfo', {
      title: 'Właściwości i Zastosowania Leków',
      content: 'Leki są substancjami, które mają na celu leczenie, łagodzenie objawów lub zapobieganie chorobom. Właściwości leków zależą od ich składu chemicznego i sposobu działania w organizmach pacjentów.'
    });
  }
  
  module.exports = {
    showMedicineInfo
  };
  