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

  const handleClick = () => {

  };

  return (
    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#252432] p-8 text-left align-middle shadow-xl transition-all">
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
        Verify Tweet
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-white/70 mb-4">Please enter your twitter handle</p>
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
          <p className="text-sm text-white/70 mb-4 bg-red-900 rounded-lg py-1 px-2 flex items-center text-red-400">
            <AiFillCloseCircle className="mr-2" />
            {verificationError}
          </p>
        </div>
      )}
      <div className="mt-4 text-right">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-white/10 px-4 py-2 text-sm text-white font-medium mr-4"
          onClick={() => dispatch(toggleModal(false))}
        >
          Cancel
        </button>
        <button
          className="connect-wallet inline-flex rounded-lg px-6 py-2 text-sm font-medium text-white"
          onClick={() => dispatch(verifyTwitterAsync(twitterHandle))}
        >
          Verify
        </button>
      </div>
    </Dialog.Panel>
  );
};

export default VerifyModal;
