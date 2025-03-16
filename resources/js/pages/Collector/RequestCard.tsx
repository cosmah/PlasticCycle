import React from 'react';
import { Link } from '@inertiajs/react';
import { Clock, Package2, User } from 'lucide-react';

interface User {
  name: string;
}

interface Request {
  id: number;
  quantity: number;
  plastic_type: string;
  user: User;
  scheduled_at: string;
  status: 'pending' | 'scheduled' | 'completed';
}

function RequestCard({ request, onAction, actionLabel }: {
  request: Request;
  onAction?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link href={route('collector.pickup-details', { id: request.id })} className="text-blue-600 hover:underline">
            <div className="flex items-center gap-2 text-gray-600">
              <Package2 className="w-4 h-4" />
              <span className="font-medium">{request.quantity} kg of {request.plastic_type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <User className="w-4 h-4" />
              <span>{request.user.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{new Date(request.scheduled_at).toLocaleDateString()}</span>
            </div>
            <div className="inline-flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                request.status === 'completed' ? 'bg-green-100 text-green-800' :
                request.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          </Link>
        </div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default RequestCard;