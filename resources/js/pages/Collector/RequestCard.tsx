import React from 'react';
import { Clock, Package2, User, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RequestCardProps {
  request: {
    id: number;
    quantity: number;
    plastic_type: string;
    user: {
      name: string;
    };
    scheduled_at: string;
    status: 'pending' | 'scheduled' | 'completed';
  };
  onAction?: () => void;
  actionLabel?: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onAction, actionLabel }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Package2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {request.quantity} kg of {request.plastic_type}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{request.user.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{formatDate(request.scheduled_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Collection Address Here</span>
              </div>
            </div>
          </div>

          {actionLabel && onAction && (
            <div className="flex justify-end">
              <Button
                onClick={onAction}
                className={`gap-2 ${
                  request.status === 'completed'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {actionLabel}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RequestCard;