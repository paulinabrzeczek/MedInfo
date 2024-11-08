const fs = require('fs');
const path = require('path');
const medicinesFilePath = path.join(__dirname, '../data/medicines.json');
const reviewsFilePath = path.join(__dirname, '../data/reviews.json');

function readMedicines() {
    return JSON.parse(fs.readFileSync(medicinesFilePath, 'utf-8'));
  }

  function saveMedicines(medicines) {
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'medicines.json'), JSON.stringify(medicines, null, 2));
  }
  
  function readReviews() {
    return JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
  }
  function getMedicinesInJson(req, res) {
    const medicines = readMedicines();
    res.json(medicines);
  }

  function downloadMedicines(req, res) {
    const filePath = path.join(__dirname, '../data/medicines.json');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="medicines.json"');
 
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Błąd podczas odczytu pliku:', err);
        return res.status(500).send('Wystąpił błąd podczas pobierania pliku.');
      }
      res.send(data);
    });
  }
function getMedicines(req, res) {
    const medicines = readMedicines();
    user = req.session.loggedIn ? true : null
    res.render('medicines', { title: 'Lista leków', medicines, user});
}

function getMedicineById(req, res) {
    const medicines = readMedicines();  
    const reviews = readReviews();      
    const medicineId = parseInt(req.params.id);  
  
    const medicine = medicines.find(med => med.id === medicineId);
  
    const medicineReviews = reviews.filter(review => review.medicineId === medicineId);
  
    if (medicine) {
      res.render('medicineDetails', {
        title: 'Szczegóły leku',
        medicine,
        reviews: medicineReviews,
        session: req.session 
      });
    } else {
      res.status(404).send("Lek nie został znaleziony");
    }
  }

function showAddMedicineForm(req, res) {
    res.render('addMedicine', { title: 'Dodaj nowy lek' });
}

function addNewMedicine(req, res) {
    const medicines = readMedicines();
    const newMedicine = {
        id: medicines.length > 0 ? medicines[medicines.length - 1].id + 1 : 1, 
        name: req.body.name,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        category: req.body.category
    };
    medicines.push(newMedicine);
    fs.writeFileSync(medicinesFilePath, JSON.stringify(medicines));
    res.redirect('/medicines'); 
}

function showEditMedicineForm(req, res) {
    const medicines = readMedicines();
    const medicine = medicines.find(med => med.id === parseInt(req.params.id));
    if (medicine) {
        res.render('editMedicine', { title: 'Edytuj lek', medicine });
    } else {
        res.status(404).send("Nie znaleziono leku");
    }
}

function editMedicine(req, res) {
    const medicines = readMedicines();
    const id = parseInt(req.params.id);
    const medicineIndex = medicines.findIndex(med => med.id === id);

    if (medicineIndex !== -1) {
        const updatedMedicine = {
            id: id, 
            name: req.body.name,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            category: req.body.category
        };

        medicines[medicineIndex] = updatedMedicine; 
        fs.writeFileSync(medicinesFilePath, JSON.stringify(medicines));
        res.redirect('/medicines'); 
    } else {
        res.status(404).send("Nie znaleziono leku");
    }
}
function readReviews() {
    return JSON.parse(fs.readFileSync(reviewsFilePath, 'utf-8'));
  }

  function writeReviews(data) {
    fs.writeFileSync(reviewsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }
 
  function getAddReviewForm(req, res) {
    const medicineId = req.params.medicineId;
    res.render('addReview', { title: 'Dodaj opinię', medicineId });
  }
function addReview(req, res) {
    const reviews = readReviews();
    const { content, recommend, usage } = req.body;
    const newReview = {
      id: reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1,
      medicineId: parseInt(req.params.medicineId),
      user: req.session.username || "Anonim",
      content,
      recommend: recommend === 'on',
      usage,
      date: new Date().toISOString()
    };
  
    reviews.push(newReview);
    writeReviews(reviews);
  
    res.redirect(`/medicines/${req.params.medicineId}`);
  }
  function getMedicineReviews(req, res) {
    const medicines = readMedicines();
    const reviews = readReviews();
  
    const medicine = medicines.find(m => m.id === parseInt(req.params.id));
    if (!medicine) {
      return res.status(404).send('Lek nie został znaleziony');
    }
  
    const filteredReviews = reviews.filter(review => review.medicineId === medicine.id);
  
    res.render('medicineReviews', { medicine, reviews: filteredReviews });
  }
  

module.exports = {
    getMedicines,
    getMedicineById,
    showAddMedicineForm,
    addNewMedicine,
    showEditMedicineForm,
    editMedicine,
    getAddReviewForm,
    addReview,
    getMedicineReviews,
    downloadMedicines,
    getMedicinesInJson
};
