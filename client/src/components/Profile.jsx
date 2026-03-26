import { useState, useEffect } from 'react';

function Profile() {
  // Αντί για "καρφωτά" δεδομένα, φτιάχνουμε ένα state.
  // Αρχικά είναι null μέχρι να έρθουν τα δεδομένα από τον server.
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    // Εδώ κανονικά θα παίρνουμε το ID από το localStorage που έσωσε ο Λουκάς στο Login
    // π.χ. const userId = localStorage.getItem('userId');
    // Για την ώρα βάζουμε ένα τυχαίο ID για να δούμε τον κώδικα
    const userId = "12345testID";

    // Ζητάμε τα δεδομένα από το Backend
    fetch(`http://localhost:3000/api/profile/${userId}`)
    .then(response => response.json())
    .then(data => {
        setUserData(data); // Αποθηκεύουμε τα δεδομένα που ήρθαν
        setLoading(false); // Κλείνουμε το loading
})
    .catch(error => {
        console.error("Σφάλμα κατά τη φόρτωση του προφίλ:", error);
        setLoading(false);
});
  }, []); // Το άδειο [] σημαίνει "τρέξε το fetch ΜΟΝΟ μια φορά όταν ανοίξει η σελίδα"

  // Όσο περιμένουμε τον server, δείχνουμε ένα μήνυμα φόρτωσης
if (loading) {
    return <div className="text-center py-20 font-bold text-gray-500">Φόρτωση Προφίλ... ⏳</div>;
}

  // Αν δεν βρέθηκε χρήστης
if (!userData) {
    return <div className="text-center py-20 text-red-500">Ο χρήστης δεν βρέθηκε!</div>;
}

const userInitial = userData.email ? userData.email.charAt(0).toUpperCase() : "?";

return (
    <div className="flex justify-center items-center py-10 w-full">
    <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-200 transition-all hover:shadow-2xl">
        
    <h2 className="text-2xl font-black mb-6 text-gray-900 tracking-wide border-b border-gray-100 pb-4">
    YOUR PROFILE
    </h2>

    <div className="flex items-center gap-6 mb-8">
    <div className="bg-indigo-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black shadow-md">
            {userInitial}
    </div>
    <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Email</span>
            <span className="text-lg font-bold text-gray-900">{userData.email}</span>
    </div>
    </div>

    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
        <p className="text-gray-800 text-lg">
            <span className="font-bold text-indigo-600 uppercase tracking-wider text-sm mr-3">Age:</span> 
            {/* Προσωρινά βάζουμε N/A μέχρι να το προσθέσει το Backend! */}
            {userData.age || "N/A"} 
        </p>
    </div>

    </div>
    </div>
);
}

export default Profile;