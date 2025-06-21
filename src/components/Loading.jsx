import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
            <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="text-lg text-gray-600">Loading products...</span>
                </div>
            </div>
    );
}

export default Loading;