"use client"

import { useState, useTransition } from 'react'
import type React from 'react'

interface DeleteProductButtonProps {
  productId: string;
  // THE FIX IS HERE: The function can now return an object or void
  deleteAction: (id: string) => Promise<{ error: string } | void | undefined>;
}

export function DeleteProductButton({ productId, deleteAction }: DeleteProductButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await deleteAction(productId);
      setShowConfirm(false);
    });
  };

  return (
    <>
      <button 
        onClick={() => setShowConfirm(true)}
        className="text-red-600 hover:text-red-800 font-medium transition-colors"
      >
        Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900">Are you sure?</h2>
            <p className="mt-2 text-gray-600">
              This product will be permanently deleted. This action cannot be undone.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <button 
                onClick={() => setShowConfirm(false)} 
                disabled={isPending}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm} 
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}