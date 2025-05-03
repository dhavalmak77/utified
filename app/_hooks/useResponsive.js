import { useMediaQuery } from '@mantine/hooks';

// These are your Mantine breakpoints
const BREAKPOINTS = {
	xs: 576,
	sm: 768,
	md: 992,
	lg: 1200,
	xl: 1408,
};

const useResponsive = (mobileBreakpoint = 768, tabletBreakpoint = 1024) => {
    const xs = useMediaQuery(`(max-width: ${BREAKPOINTS.xs}px)`);
    const sm = useMediaQuery(`(min-width: ${BREAKPOINTS.xs + 1}px) and (max-width: ${BREAKPOINTS.sm}px)`);
    const md = useMediaQuery(`(min-width: ${BREAKPOINTS.sm + 1}px) and (max-width: ${BREAKPOINTS.md}px)`);
    const lg = useMediaQuery(`(min-width: ${BREAKPOINTS.md + 1}px) and (max-width: ${BREAKPOINTS.lg}px)`);
    const xl = useMediaQuery(`(min-width: ${BREAKPOINTS.lg + 1}px)`);

	const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
	const isTablet = useMediaQuery(`(min-width: ${mobileBreakpoint + 1}px) and (max-width: ${tabletBreakpoint}px)`);
	const isDesktop = useMediaQuery(`(min-width: ${tabletBreakpoint + 1}px)`);

	return { xs, sm, md, lg, xl, isMobile, isTablet, isDesktop };
};

export default useResponsive;

// 'use client';

// import { useMediaQuery } from '@mantine/hooks';

// // These are your Mantine breakpoints
// const BREAKPOINTS = {
// 	xs: 576,
// 	sm: 768,
// 	md: 992,
// 	lg: 1200,
// 	xl: 1408,
// };

// const useResponsive = () => {
// 	// Small Mobile ≤ 480
// 	const isSmallMobile = useMediaQuery(`(max-width: 480px)`);

// 	// Large Mobile 481–767
// 	const isLargeMobile = useMediaQuery(`(min-width: 481px) and (max-width: 767px)`);

// 	// Tablet Portrait 768–899
// 	const isTabletPortrait = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: 899px)`);

// 	// Tablet Landscape 900–1023
// 	const isTabletLandscape = useMediaQuery(`(min-width: 900px) and (max-width: 1023px)`);

// 	// Laptop 1024–1279
// 	const isLaptop = useMediaQuery(`(min-width: 1024px) and (max-width: 1279px)`);

// 	// Desktop 1280–1535
// 	const isDesktop = useMediaQuery(`(min-width: 1280px) and (max-width: 1535px)`);

// 	// Large Desktop ≥ 1536
// 	const isLargeDesktop = useMediaQuery(`(min-width: 1536px)`);

// 	// Additional quick checks (Mobile, Tablet, Desktop global flags)
// 	const isMobile = isSmallMobile || isLargeMobile;
// 	const isTablet = isTabletPortrait || isTabletLandscape;
// 	const isDesktopOrAbove = isLaptop || isDesktop || isLargeDesktop;

// 	return {
// 		isSmallMobile,
// 		isLargeMobile,
// 		isTabletPortrait,
// 		isTabletLandscape,
// 		isLaptop,
// 		isDesktop,
// 		isLargeDesktop,
// 		isMobile,
// 		isTablet,
// 		isDesktopOrAbove,
// 	};
// };

// export default useResponsive;
