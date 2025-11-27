import React from 'react';
import { Stage, Layer, Rect, Circle, Line, Group, Text } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayerPosition, selectPlayer } from '../store/playersSlice';
import type { RootState } from '../store';
import { theme } from '../theme';

interface TerrainProps {
    largeur: number;
    hauteur: number;
}

const Terrain: React.FC<TerrainProps> = ({ largeur, hauteur }) => {
    const dispatch = useDispatch();
    const { present: joueurs, selectedPlayerId } = useSelector((state: RootState) => state.players);

    // Modern Dark Pitch Colors
    const couleurGazon = 'hsl(222, 47%, 13%)'; // Matches app background for seamless look, or slightly lighter
    const couleurLignes = 'rgba(255, 255, 255, 0.15)';
    const couleurAccent = theme.colors.secondary; // Vibrant Green for active elements

    const handleDragEnd = (e: any, id: string) => {
        dispatch(updatePlayerPosition({
            id,
            x: e.target.x(),
            y: e.target.y(),
        }));
    };

    const handlePlayerClick = (e: any, id: string) => {
        e.cancelBubble = true;
        dispatch(selectPlayer(id));
    };

    const handlePlayerDblClick = (e: any, id: string) => {
        e.cancelBubble = true;
        dispatch(selectPlayer(id));
        window.dispatchEvent(new CustomEvent('openPlayerEditor', { detail: { playerId: id } }));
    };

    return (
        <Stage width={largeur} height={hauteur} onClick={() => dispatch(selectPlayer(null))}>
            <Layer>
                {/* Pitch Background - Subtle Gradient effect via multiple rects or just solid */}
                <Rect
                    x={0}
                    y={0}
                    width={largeur}
                    height={hauteur}
                    fill={couleurGazon}
                />

                {/* Pitch Pattern (Stripes) - Optional, keeping it clean for now */}

                {/* Pitch Lines */}
                <Group>
                    {/* Outer Boundary */}
                    <Rect
                        x={largeur * 0.05}
                        y={hauteur * 0.05}
                        width={largeur * 0.9}
                        height={hauteur * 0.9}
                        stroke={couleurLignes}
                        strokeWidth={2}
                        cornerRadius={4}
                    />

                    {/* Center Line */}
                    <Line
                        points={[largeur * 0.05, hauteur / 2, largeur * 0.95, hauteur / 2]}
                        stroke={couleurLignes}
                        strokeWidth={2}
                    />

                    {/* Center Circle */}
                    <Circle
                        x={largeur / 2}
                        y={hauteur / 2}
                        radius={largeur * 0.12}
                        stroke={couleurLignes}
                        strokeWidth={2}
                    />

                    {/* Center Spot */}
                    <Circle
                        x={largeur / 2}
                        y={hauteur / 2}
                        radius={3}
                        fill={couleurLignes}
                    />

                    {/* Penalty Area Bottom */}
                    <Rect
                        x={largeur * 0.22}
                        y={hauteur * 0.83}
                        width={largeur * 0.56}
                        height={hauteur * 0.12}
                        stroke={couleurLignes}
                        strokeWidth={2}
                    />

                    {/* Penalty Area Top */}
                    <Rect
                        x={largeur * 0.22}
                        y={hauteur * 0.05}
                        width={largeur * 0.56}
                        height={hauteur * 0.12}
                        stroke={couleurLignes}
                        strokeWidth={2}
                    />

                    {/* Goal Bottom */}
                    <Line
                        points={[largeur * 0.42, hauteur * 0.95, largeur * 0.58, hauteur * 0.95]}
                        stroke={couleurAccent}
                        strokeWidth={4}
                        shadowColor={couleurAccent}
                        shadowBlur={10}
                    />

                    {/* Goal Top */}
                    <Line
                        points={[largeur * 0.42, hauteur * 0.05, largeur * 0.58, hauteur * 0.05]}
                        stroke={couleurAccent}
                        strokeWidth={4}
                        shadowColor={couleurAccent}
                        shadowBlur={10}
                    />
                </Group>

                {/* Players */}
                {joueurs.map((joueur) => (
                    <Group
                        key={joueur.id}
                        x={joueur.x}
                        y={joueur.y}
                        draggable
                        onDragEnd={(e) => handleDragEnd(e, joueur.id)}
                        onClick={(e) => handlePlayerClick(e, joueur.id)}
                        onTap={(e) => handlePlayerClick(e, joueur.id)}
                        onDblClick={(e) => handlePlayerDblClick(e, joueur.id)}
                        onDblTap={(e) => handlePlayerDblClick(e, joueur.id)}
                    >
                        {/* Selection Glow */}
                        {selectedPlayerId === joueur.id && (
                            <Circle
                                radius={22}
                                stroke={theme.colors.primary}
                                strokeWidth={2}
                                shadowColor={theme.colors.primary}
                                shadowBlur={15}
                            />
                        )}

                        {/* Player Body */}
                        <Circle
                            radius={16}
                            fill={joueur.couleur}
                            stroke={theme.colors.background}
                            strokeWidth={2}
                            shadowColor="black"
                            shadowBlur={10}
                            shadowOpacity={0.5}
                        />

                        {/* Number */}
                        <Text
                            text={joueur.numero.toString()}
                            fontSize={14}
                            fontStyle="bold"
                            fill="#fff"
                            offsetX={joueur.numero > 9 ? 9 : 5}
                            offsetY={6}
                            fontFamily={theme.fonts.heading}
                        />

                        {/* Name Label */}
                        <Text
                            text={joueur.nom}
                            fontSize={11}
                            fill={theme.colors.text.secondary}
                            offsetX={30}
                            offsetY={-24}
                            align="center"
                            width={60}
                            fontFamily={theme.fonts.body}
                        />
                    </Group>
                ))}
            </Layer>
        </Stage>
    );
};

export default Terrain;
