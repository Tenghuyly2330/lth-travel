import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Unable to load content. Please try again.', onRetry }) => {
      return (
            <div className="my-12 p-8 max-w-lg mx-auto bg-amber-50/80 border border-amber-200 rounded-3xl text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-orange-600 flex items-center justify-center mx-auto">
                        <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                        <h4 className="font-serif-heading text-lg font-bold text-slate-900">Connection Notice</h4>
                        <p className="text-slate-600 text-sm">{message}</p>
                  </div>
                  {onRetry && (
                        <button
                              onClick={onRetry}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors shadow-xs"
                        >
                              <RefreshCw className="w-4 h-4" />
                              <span>Try Again</span>
                        </button>
                  )}
            </div>
      );
};

export default ErrorMessage;
