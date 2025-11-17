import { useState, useEffect } from "react";
import { Card } from "./Card.jsx";

export default function TaskManager() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const API_URL = import.meta.env.VITE_API_URL + "/patients";

  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients. Please try again.');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !condition.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          condition: condition.trim(), 
          age: 30 
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to add patient');
      }
      
      const newPatient = await res.json();
      setPatients([newPatient, ...patients]);
      setName("");
      setCondition("");
      setSuccess("✅ Patient added successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError('Failed to add patient. Please try again.');
      console.error('Error adding patient:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Are you sure you want to remove this patient?")) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete patient');
      }
      
      setPatients(patients.filter(p => p._id !== id));
      setSuccess("🗑️ Patient removed successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError('Failed to delete patient. Please try again.');
      console.error('Error deleting patient:', err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPatientInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getConditionColor = (condition) => {
    const colors = {
      'routine': 'bg-blue-100 text-blue-800',
      'urgent': 'bg-yellow-100 text-yellow-800',
      'emergency': 'bg-red-100 text-red-800',
      'follow-up': 'bg-purple-100 text-purple-800'
    };
    
    const lowerCondition = condition.toLowerCase();
    for (const [key, value] of Object.entries(colors)) {
      if (lowerCondition.includes(key)) {
        return value;
      }
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="relative" padding="p-0" shadow="shadow-2xl">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">👥 Patient Management</h2>
            <p className="text-gray-600">Manage patient intake and conditions efficiently</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3">
            <span className="text-white text-2xl">🏥</span>
          </div>
        </div>

        {/* Add Patient Form */}
        <form onSubmit={addPatient} className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">➕ Add New Patient</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Patient name"
                  className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                  disabled={submitting}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">👤</span>
                </div>
              </div>
              <div className="relative">
                <input
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="Condition/Reason"
                  className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                  disabled={submitting}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">🩺</span>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={submitting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  'Add Patient'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center">
            <span className="mr-2">✅</span>
            {success}
          </div>
        )}

        {/* Search and Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="🔍 Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Total: {patients.length}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              Showing: {filteredPatients.length}
            </span>
          </div>
        </div>

        {/* Patients List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading patients...</p>
            </div>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {patients.length === 0 ? 'No patients yet' : 'No patients found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {patients.length === 0 
                ? 'Add your first patient to get started with patient management.'
                : 'Try adjusting your search terms to find patients.'}
            </p>
            {patients.length === 0 && (
              <button
                onClick={() => document.querySelector('input[placeholder="Patient name"]')?.focus()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Add First Patient
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient, index) => (
              <Card 
                key={patient._id || index} 
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                interactive={true}
              >
                <div className="space-y-4">
                  {/* Patient Avatar and Name */}
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 w-12 h-12 flex items-center justify-center text-white font-semibold text-lg">
                      {getPatientInitials(patient.name)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{patient.name}</h4>
                      <p className="text-sm text-gray-500">ID: {patient._id?.slice(-6) || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Condition Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(patient.condition)}`}>
                      {patient.condition}
                    </span>
                    {patient.age && (
                      <span className="text-sm text-gray-500">
                        {patient.age} years old
                      </span>
                    )}
                  </div>

                  {/* Patient Info */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Added:</span>
                      <span className="text-gray-800 font-medium">
                        {new Date(patient.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    {patient.updatedAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Updated:</span>
                        <span className="text-gray-800 font-medium">
                          {new Date(patient.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200">
                      👁️ View
                    </button>
                    <button className="flex-1 bg-yellow-100 text-yellow-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors duration-200">
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => deletePatient(patient._id)}
                      className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        {!loading && patients.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={fetchPatients}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
            >
              🔄 Refresh Data
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
