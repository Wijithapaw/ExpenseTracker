import React from 'react';

import Modal from '../../components/Modal';
import EntryForm from './EntryForm';

export interface Props {
  expenseId?: string;
  onSave?: () => void;
  onClose: () => void;
}

export default function ExpenseEdit({ expenseId, onSave, onClose }: Props) {
  return (
    <Modal title='Edit Expense' visible={!!expenseId} onRequestClose={onClose}>
      <EntryForm expenseId={expenseId} onSaved={onSave} />
    </Modal>
  );
}
