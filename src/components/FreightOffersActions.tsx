'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Plus, RefreshCw, Trash } from 'lucide-react';
import { useState, useTransition } from 'react';
import { deleteAllFreightOffersAction, generateFreightOffersAction } from '@/lib/actions';

interface FreightOffersActionsProps {
  hasOffers: boolean;
}

export default function FreightOffersActions({ hasOffers }: FreightOffersActionsProps) {
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generateAmount, setGenerateAmount] = useState(5);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generateFreightOffersAction(generateAmount);
      if (result.success) {
        setShowGenerateModal(false);
        // Trigger refresh in FreightOffersContainer
        window.dispatchEvent(new CustomEvent('refresh-freight-offers'));
      } else {
        // Handle error - could show toast notification
        console.error('Generate failed:', result.error);
      }
    });
  };

  const handleDeleteAll = () => {
    startTransition(async () => {
      const result = await deleteAllFreightOffersAction();
      if (result.success) {
        setShowDeleteAll(false);
        // Trigger refresh in FreightOffersContainer
        window.dispatchEvent(new CustomEvent('refresh-freight-offers'));
      } else {
        // Handle error - could show toast notification
        console.error('Delete all failed:', result.error);
      }
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => setShowGenerateModal(true)}
          disabled={isPending}
          className="bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate
        </Button>

        {hasOffers && (
          <Button
            size="sm"
            onClick={() => setShowDeleteAll(true)}
            disabled={isPending}
            className="bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
            title="Delete All Offers"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete All
          </Button>
        )}
      </div>

      {/* Generate Modal */}
      <Modal
        isOpen={showGenerateModal}
        onClose={() => !isPending && setShowGenerateModal(false)}
        title="Generate Freight Offers"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Number of offers to generate
            </label>
            <Input
              id="amount"
              type="number"
              min="1"
              max="100"
              value={generateAmount}
              onChange={e => setGenerateAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-white"
              disabled={isPending}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowGenerateModal(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isPending || generateAmount < 1}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate {generateAmount} Offers
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete All Confirmation Modal */}
      {showDeleteAll && (
        <Modal
          isOpen={showDeleteAll}
          onClose={() => !isPending && setShowDeleteAll(false)}
          title="Delete All Freight Offers"
        >
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-900 mb-4">
                Are you sure you want to delete all freight offers?
              </p>
              <p className="text-sm text-gray-600">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteAll(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAll}
                disabled={isPending}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete All
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
