import React, {createContext, useContext} from 'react'

interface PositionContextType {
    closePosition: (id: number) => void;
}

const PositionContext = createContext<PositionContextType | undefined>(undefined);

export const PositionProvider: React.FC<{ 
    closePosition: (id: number) => void; 
    children: React.ReactNode
}> = ({ children, closePosition }) => {
    return (
      <PositionContext.Provider value={{ closePosition }}>
        {children}
      </PositionContext.Provider>
    );
  };

export const usePosition = () => {
    const context = useContext(PositionContext);
    if (!context) {
        throw new Error('usePosition must be used within a PositionProvider');
    }
    return context;
};