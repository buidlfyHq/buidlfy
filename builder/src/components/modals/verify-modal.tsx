import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { toggleModal } from 'redux/modal/modal.reducers';
import { verifyTwitterAsync } from 'redux/user/user.thunk-actions';
import { IRootState } from 'redux/root-state.interface';
import { AiFillCloseCircle } from 'react-icons/ai';

const VerifyModal: FC = () => {
  const dispatch = useDispatch();
  const verificationError = useSelector((state: IRootState) => state.user.verificationError);
  const [twitterHandle, setTwitterHandle] = useState<string>('');

  return (
    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#252432] p-8 text-left align-middle shadow-xl transition-all">
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
        Verify Tweet
      </Dialog.Title>
      <div className="mt-2">
        <p className="mb-4 text-sm text-white/70">Please enter your twitter handle</p>
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="Twitter Handle"
          className="py-2 pl-4 bg-black/40 w-full rounded-lg border border-[#3A36ED]/70 outline-none text-white"
          value={twitterHandle}
          onChange={e => setTwitterHandle(e.target.value)}
        />
      </div>
      {verificationError && (
        <div className="my-2">
          <p className="flex items-center px-2 py-1 mb-4 text-sm text-red-400 bg-red-900 rounded-lg text-white/70">
            <AiFillCloseCircle className="mr-2" />
            {verificationError}
          </p>
        </div>
      )}
      <div className="mt-4 text-right">
        <button
          className="inline-flex justify-center px-4 py-2 mr-4 text-sm font-medium text-white border border-transparent rounded-md bg-white/10"
          onClick={() => dispatch(toggleModal(false))}
        >
          Cancel
        </button>
        <button
          disabled={twitterHandle.length === 0}
          className={`inline-flex px-6 py-2 text-sm font-medium text-white rounded-lg connect-wallet ${
            twitterHandle.length === 0 && 'cursor-not-allowed opacity-70'
          }`}
          onClick={() => dispatch(verifyTwitterAsync(twitterHandle))}
        >
          Verify
        </button>
      </div>
    </Dialog.Panel>
  );
};

export default VerifyModal;
