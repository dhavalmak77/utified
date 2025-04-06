'use client';

import { useMantineColorScheme, Menu, Button } from '@mantine/core';
import { LuContrast, LuMoon, LuRotateCcw, LuSun, LuUndo2 } from 'react-icons/lu';

const themeModeIcons = {
	light: <LuSun />,
	dark: <LuMoon />,
	auto: <LuContrast />,
	clear: <LuRotateCcw />
};

export const ThemeMode = () => {
    const { colorScheme, setColorScheme, clearColorScheme } = useMantineColorScheme();

	return (
		<Menu shadow='md'>
			<Menu.Target>
				<Button
					variant='default'
					fw={500}
					leftSection={themeModeIcons[colorScheme]}
				>
					Theme
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					leftSection={themeModeIcons.light}
					onClick={() => setColorScheme('light')}
					color={colorScheme === 'light' && 'var(--mantine-primary-color-light-color)'}
				>
					Light
				</Menu.Item>
				<Menu.Item
					leftSection={themeModeIcons.dark}
					onClick={() => setColorScheme('dark')}
					color={colorScheme === 'dark' && 'var(--mantine-primary-color-light-color)'}
				>
					Dark
				</Menu.Item>
				<Menu.Item
					leftSection={themeModeIcons.auto}
					onClick={() => setColorScheme('auto')}
					color={colorScheme === 'auto' && 'var(--mantine-primary-color-light-color)'}
				>
					Auto
				</Menu.Item>
				<Menu.Item
					leftSection={<LuUndo2 />}
					onClick={clearColorScheme}
					color={colorScheme === 'reset' && 'var(--mantine-primary-color-light-color)'}
				>
					Reset
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
