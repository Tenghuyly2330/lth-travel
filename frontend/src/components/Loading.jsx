import { Compass } from 'lucide-react';

const Loading = ({ message = 'Loading experience...' }) => {
      return (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 animate-spin">
                        <Compass className="w-7 h-7" />
                  </div>
                  <p className="text-slate-600 font-medium text-sm animate-pulse">{message}</p>
            </div>
      );
};

export default Loading;
