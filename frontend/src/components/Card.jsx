import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  interactive = false,
  onClick,
  hover = true,
  padding = 'p-6',
  shadow = 'shadow-lg',
  border = true
}) {
  const baseClasses = 'bg-white rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'border border-gray-100',
    elevated: 'shadow-xl border-0',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
  };

  const interactiveClasses = interactive || onClick ? 'cursor-pointer' : '';
  const hoverClasses = hover && (interactive || onClick) 
    ? 'hover:shadow-2xl hover:-translate-y-1 hover:scale-105' 
    : hover 
      ? 'hover:shadow-xl' 
      : '';

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${padding} ${shadow} ${hoverClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {children}
      
      {/* Optional subtle gradient overlay for premium feel */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none"></div>
      )}
    </div>
  );
}

// Specialized card components for different use cases
export function StatCard({ 
  icon, 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  className = '' 
}) {
  const changeColors = {
    positive: 'text-green-600 bg-green-100',
    negative: 'text-red-600 bg-red-100',
    neutral: 'text-blue-600 bg-blue-100'
  };

  return (
    <Card className={`relative overflow-hidden ${className}`} hover={true}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
          {change && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
              {change}
            </div>
          )}
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full p-4">
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
      
      {/* Decorative gradient element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full transform translate-x-6 -translate-y-6"></div>
    </Card>
  );
}

export function PatientCard({ 
  patient, 
  triage, 
  onView, 
  onEdit, 
  onComplete,
  className = '' 
}) {
  const getUrgencyColor = (urgent) => {
    return urgent ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`${className}`} interactive={true}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {patient?.name || 'Anonymous Patient'}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(triage?.urgent)}`}>
                {triage?.urgent ? '🚨 Urgent' : '✅ Normal'}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {formatDate(triage?.createdAt || Date.now())}
            </p>
          </div>
          {triage?.category && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
              {triage.category}
            </span>
          )}
        </div>

        {/* Symptoms */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {triage?.symptoms || 'No symptoms recorded'}
          </p>
        </div>

        {/* Vitals */}
        {triage?.vitals && (
          <div className="grid grid-cols-2 gap-4">
            {triage.vitals.temperature && (
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🌡️</span>
                  <div>
                    <p className="text-xs text-blue-600 font-medium">Temperature</p>
                    <p className="text-sm font-semibold text-blue-800">
                      {triage.vitals.temperature}°C
                    </p>
                  </div>
                </div>
              </div>
            )}
            {triage.vitals.oxygen && (
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">🫁</span>
                  <div>
                    <p className="text-xs text-green-600 font-medium">Oxygen</p>
                    <p className="text-sm font-semibold text-green-800">
                      {triage.vitals.oxygen}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onView && (
            <button 
              onClick={() => onView(triage)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              👁️ View Details
            </button>
          )}
          {onEdit && (
            <button 
              onClick={() => onEdit(triage)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              ✏️ Edit
            </button>
          )}
          {onComplete && (
            <button 
              onClick={() => onComplete(triage)}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
            >
              ✅ Complete
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  action,
  className = '' 
}) {
  return (
    <Card className={`${className} group`} hover={true}>
      <div className="text-center space-y-4">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 w-20 h-20 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span className="text-4xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        {action && (
          <div className="pt-2">
            {action}
          </div>
        )}
      </div>
    </Card>
  );
}
