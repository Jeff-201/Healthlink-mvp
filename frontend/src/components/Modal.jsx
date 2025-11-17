import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (closeOnEscape && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} ${className} transform transition-all`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-xl font-semibold text-gray-800">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Confirmation Modal
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  loading = false
}) => {
  const typeConfig = {
    warning: {
      icon: "⚠️",
      confirmButton: "bg-yellow-600 hover:bg-yellow-700 text-white",
      iconBg: "bg-yellow-100"
    },
    danger: {
      icon: "🚨",
      confirmButton: "bg-red-600 hover:bg-red-700 text-white",
      iconBg: "bg-red-100"
    },
    info: {
      icon: "ℹ️",
      confirmButton: "bg-blue-600 hover:bg-blue-700 text-white",
      iconBg: "bg-blue-100"
    },
    success: {
      icon: "✅",
      confirmButton: "bg-green-600 hover:bg-green-700 text-white",
      iconBg: "bg-green-100"
    }
  };

  const config = typeConfig[type];

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`${config.iconBg} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
          <span className="text-2xl">{config.icon}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 ${config.confirmButton}`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Alert Modal
export const AlertModal = ({ 
  isOpen, 
  onClose, 
  title = "Notice",
  message,
  type = "info",
  buttonText = "OK"
}) => {
  const typeConfig = {
    info: {
      icon: "ℹ️",
      iconBg: "bg-blue-100",
      textColor: "text-blue-800"
    },
    success: {
      icon: "✅",
      iconBg: "bg-green-100",
      textColor: "text-green-800"
    },
    warning: {
      icon: "⚠️",
      iconBg: "bg-yellow-100",
      textColor: "text-yellow-800"
    },
    error: {
      icon: "❌",
      iconBg: "bg-red-100",
      textColor: "text-red-800"
    }
  };

  const config = typeConfig[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`${config.iconBg} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
          <span className="text-2xl">{config.icon}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <button
          onClick={onClose}
          className={`px-6 py-2 rounded-lg font-medium text-white ${config.textColor.replace('text-', 'bg-').replace('-800', '-600')} hover:${config.textColor.replace('text-', 'bg-').replace('-800', '-700')} transition-colors duration-200`}
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
};

// Patient Details Modal
export const PatientModal = ({ 
  isOpen, 
  onClose, 
  patient, 
  triage = null 
}) => {
  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Patient Details" size="lg">
      <div className="space-y-6">
        {/* Patient Header */}
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 w-16 h-16 flex items-center justify-center text-white font-bold text-xl">
            {patient.name?.charAt(0)?.toUpperCase() || 'P'}
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800">{patient.name}</h4>
            <p className="text-gray-600">Patient ID: {patient._id?.slice(-8) || 'N/A'}</p>
            {patient.age && <p className="text-gray-600">Age: {patient.age}</p>}
          </div>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-800 mb-3">📋 Basic Information</h5>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Condition:</span>
                <span className="font-medium">{patient.condition || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Added:</span>
                <span className="font-medium">
                  {new Date(patient.createdAt).toLocaleDateString()}
                </span>
              </div>
              {patient.updatedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium">
                    {new Date(patient.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {triage && (
            <div>
              <h5 className="font-medium text-gray-800 mb-3">🚑 Latest Triage</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{triage.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgency:</span>
                  <span className={`font-medium ${triage.urgent ? 'text-red-600' : 'text-green-600'}`}>
                    {triage.urgent ? 'Urgent' : 'Normal'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">
                    {new Date(triage.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Triage Details */}
        {triage && (
          <div>
            <h5 className="font-medium text-gray-800 mb-3">🩺 Symptoms & Vitals</h5>
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              <div>
                <h6 className="font-medium text-gray-700 mb-2">Symptoms:</h6>
                <p className="text-gray-600">{triage.symptoms || 'No symptoms recorded'}</p>
              </div>
              
              {triage.vitals && (
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">Vital Signs:</h6>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {triage.vitals.temperature && (
                      <div className="bg-blue-100 rounded-lg p-3 text-center">
                        <div className="text-blue-600 text-sm">🌡️ Temperature</div>
                        <div className="font-semibold text-blue-800">{triage.vitals.temperature}°C</div>
                      </div>
                    )}
                    {triage.vitals.oxygen && (
                      <div className="bg-green-100 rounded-lg p-3 text-center">
                        <div className="text-green-600 text-sm">🫁 Oxygen</div>
                        <div className="font-semibold text-green-800">{triage.vitals.oxygen}%</div>
                      </div>
                    )}
                    {triage.vitals.heartRate && (
                      <div className="bg-red-100 rounded-lg p-3 text-center">
                        <div className="text-red-600 text-sm">❤️ Heart Rate</div>
                        <div className="font-semibold text-red-800">{triage.vitals.heartRate} bpm</div>
                      </div>
                    )}
                    {triage.vitals.bloodPressure && (
                      <div className="bg-purple-100 rounded-lg p-3 text-center">
                        <div className="text-purple-600 text-sm">🩺 BP</div>
                        <div className="font-semibold text-purple-800">{triage.vitals.bloodPressure}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button 
            onClick={() => {/* Handle edit */}}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            ✏️ Edit Patient
          </button>
          <button 
            onClick={() => {/* Handle triage */}}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
          >
            🚑 New Triage
          </button>
        </div>
      </div>
    </Modal>
  );
};