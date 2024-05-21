// components/ToDoItem.tsx
import { SERVER_URL } from "@/Const";
import React, { useState, useCallback } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import { LocalStorageDataSource } from "@/Data/DataSource";

interface ToDoItemProps {
    id: any; //안되면 이거탓임
    name: string;
    recordProgress: boolean;
    completion: number;
    label: number;
    isComplete: boolean;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ id, name, recordProgress, completion, label, isComplete }) => {
    const [progress, setProgress] = useState<number>(completion);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleCompleteClick = async () => {
        const accessToken = await LocalStorageDataSource.getLocalStorage("accessToken");
        console.log(accessToken);
        try {
            const res = await fetch(`${SERVER_URL}/job/complete/${id}?completion=${progress}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            console.log(res.json());
            if (res.status !== 200) {
                return Promise.reject(res.status);
            }
        } catch (error) {
            return Promise.reject(500);
        }
    }

    const handleMouseDown = () => {
        if (recordProgress) {
            setIsDragging(true);
        }
    };

    const handleMouseUp = () => {
        if (recordProgress) {
            setIsDragging(false);
        }
    };

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging && recordProgress) {
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const newProgress = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);
            const steppedProgress = Math.round(newProgress / 10) * 10;
            setProgress(steppedProgress);
        }
    }, [isDragging, recordProgress]);


    const setLabel = (l: number): string => {
        if (l === 1) return "#AFD5F7";
        if (l === 2) return "#FBB4C1";
        if (l === 3 || l === 0) return "#B7E6B6";

        return '#FFF';
    }

    const completionColor = (l: number): string => {
        if (l === 1) return "#AFD5F7";
        if (l === 2) return "#FBB4C1";
        if (l === 3) return "#B7E6B6";
        return '#FFF';
    }

    const completedColor = (l: number): string => {
        if (l === 1) return "#97b6d2";
        if (l === 2) return "#ba9a9f";
        if (l === 3) return "#9eb39e";
        return '#FFF';
    }

    return (
        <>
            {completion !== -1 ? <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleCompleteClick}
                style={{
                    backgroundColor: "#FFF",
                    position: 'relative',
                    justifyContent: 'center',
                    alignContent: 'center',
                    boxShadow: '1px 2px 1px 1px rgba(0, 0, 0, 0.2)',
                    height: '100%',
                    cursor: recordProgress ? 'pointer' : 'default',
                    padding: '10px',
                    border: '1px solid #ccc',
                    margin: '5px',
                    borderRadius: '5px',
                    userSelect: 'none'
                }
                }
            >
                {recordProgress && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: `${progress == 100 ? completedColor(label) : completionColor(label)}`,
                        borderRadius: 'inherit',
                        zIndex: 0,
                    }} />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3>{name}</h3>
                    {(progress !== -1) && recordProgress && <p>Progress: {progress}%</p>}
                </div>
            </div> : <div style={{
                backgroundColor: `${setLabel(label)}`,
                position: 'relative',
                justifyContent: 'center',
                alignContent: 'center',
                boxShadow: '1px 2px 1px 1px rgba(0, 0, 0, 0.2)',
                height: '100%',
                cursor: recordProgress ? 'pointer' : 'default',
                padding: '10px',
                border: '1px solid #ccc',
                margin: '5px',
                borderRadius: '5px',
                userSelect: 'none'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3>{name}</h3>
                    {(progress !== -1) && recordProgress && <p>Progress: {progress}%</p>}
                </div>
            </div>}
            {(isComplete) ? (
                <CheckIcon
                    width={26}
                    height={26}
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default ToDoItem;
