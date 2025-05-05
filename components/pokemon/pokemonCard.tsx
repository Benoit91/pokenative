import { useThemeColors } from "@/hooks/useThemeColors"
import { Link } from "expo-router"
import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { Card } from "../card"
import ThemedText from "../ThemedText"

type Props = {
    style: ViewStyle,
    id: number,
    name: string
}

export function PokemonCard({ style, id, name }: Props) {
    const colors = useThemeColors()
    return <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild> 
        <Pressable style={style} android_ripple={{color: colors.tint, foreground: true}}>
            {/* //https://reactnative.dev/docs/pressable */} 
            {/* grâce au Link asChild, le Pressable reçoit automatiquement les choses */}
            <Card style={[styles.card]}>
        <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
        <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
        <Image
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` }}
            width={72}
            height={72}
        />
        <ThemedText>{name}</ThemedText>
        
    </Card>
        </Pressable>
        </Link>
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding: 4
    },
    id: {
        alignSelf: 'flex-end'
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 7
    }
})