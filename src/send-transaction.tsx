import * as React from 'react';
import { useSendTransaction} from 'wagmi';
import {parseEther} from 'viem';

export function SendTransaction() {
    const {data: hash, isPending, sendTransaction} = useSendTransaction();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const to = formData.get('address') as string;
        const value = formData.get('value') as string;
        sendTransaction({to, value: parseEther(value)});
    }


    return (
        <form onSubmit={submit}>
            <input name="address" placeholder="0xA0Cf…251e" required />
            <input name="value" placeholder="0.5" required />
            <button 
                disabled={isPending}
                type="submit"
            >
                {isPending ? 'Confirming...' : 'Send'}    
            </button>
            {hash && <div>Transaction hash: {hash}</div>}
        </form>
    )
}