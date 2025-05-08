import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps

export function RootView({ style, ...rest }: Props) {
    const colors = useThemeColors()
    return <SafeAreaView style={[RootStyle, { backgroundColor: colors.tint }, style]}
        {...rest} />
}

const RootStyle = {
    
    flex: 1,
    padding: 4,
} satisfies ViewStyle;