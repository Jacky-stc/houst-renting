import { memo } from 'react';
import { IconType } from 'react-icons';

export const HouseConfig = memo(({ houseConfig }: { houseConfig: { icon: IconType; text: string }[] }) => {
  if (!houseConfig) return null;
  const row1 = houseConfig.slice(0, 4);
  const row2 = houseConfig.slice(4, 7);
  return (
    <>
      <div className="mt-6 mb-1">
        {row1.map((config) => (
          <>
            <config.icon className="inline-block" color="green" />
            <span className="ml-1 mr-5 align-middle">{config.text}</span>
          </>
        ))}
      </div>
      <div className="mb-6">
        {row2.map((config) => (
          <>
            <config.icon className="inline-block" color="#df8a02" />
            <span className="ml-1 mr-5 align-middle">{config.text}</span>
          </>
        ))}
      </div>
    </>
  );
});

HouseConfig.displayName = 'HouseConfig';
