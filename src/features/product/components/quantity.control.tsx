import { forwardRef } from "react";

export const QuantityControl = forwardRef<HTMLInputElement, { defaultValue?: number }>(({ defaultValue = 1 }, ref) => {
    return (
        <div className="w-fit text-hijau-tua flex flex-row gap-2 border border-tertiary-gray rounded-xl font-[16px] font-(family-name:--font-dm-sans)">
            <div className="border-r border-tertiary-gray">
                <button
                    className="w-10 h-10 hover:bg-tertiary-gray rounded-l-xl m-px"
                    onClick={() => {
                        const currentVal = Number((ref as React.RefObject<HTMLInputElement>)?.current?.value || 0);
                        if ((ref as React.RefObject<HTMLInputElement>)?.current) {
                            (ref as React.RefObject<HTMLInputElement>).current.value = Math.max(1, currentVal - 1).toString();
                        }
                    }}
                >
                    -
                </button>
            </div>
            <input
                type="number"
                className="w-auto h-10 text-center max-w-[50px] font-bold"
                ref={ref}
                defaultValue={defaultValue}
                min="1"
            />
            <div className="border-l border-tertiary-gray">
                <button
                    className="w-10 h-10 hover:bg-tertiary-gray rounded-r-xl m-px"
                    onClick={() => {
                        const currentVal = Number((ref as React.RefObject<HTMLInputElement>)?.current?.value || 0);
                        if ((ref as React.RefObject<HTMLInputElement>)?.current) {
                            (ref as React.RefObject<HTMLInputElement>).current.value = (currentVal + 1).toString();
                        }
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
});

QuantityControl.displayName = 'QuantityControl';