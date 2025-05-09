import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { SafeAreaView, ViewProps, ViewStyle } from "react-native";
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = ViewProps & {
    backgroundColor?: string;
    children?: React.ReactNode;
};

export function RootView({ style, backgroundColor, children, ...rest }: Props) {
    const colors = useThemeColors();
    const progress = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                progress.value,
                [0, 1],
                [colors.tint, backgroundColor ?? colors.tint],
            ),
        };
    }, [backgroundColor]);

    useEffect(() => {
        if (backgroundColor) {
            progress.value = 0;
            progress.value = withTiming(1, {
                duration: 700,
                easing: Easing.out(Easing.quad),
                reduceMotion: ReduceMotion.System,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backgroundColor]);

    if (!backgroundColor) {
        return (
            <SafeAreaView style={[RootStyle, { backgroundColor: colors.tint }, style]} {...rest}>
                {children}
            </SafeAreaView>
        );
    }

    return (
        <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>
            <SafeAreaView style={RootStyle} {...rest}>
                {children}
            </SafeAreaView>
        </Animated.View>
    );
}

const RootStyle = {
    flex: 1,
    padding: 4,
} satisfies ViewStyle;


