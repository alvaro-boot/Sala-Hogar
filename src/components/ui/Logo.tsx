import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  href?: string
  className?: string
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12"
}

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl"
}

export function Logo({ 
  size = "md", 
  showText = true, 
  href = "/",
  className = ""
}: LogoProps) {
  const logoElement = (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/images/logo_salahogar.png"
        alt="Sala Hogar"
        width={size === "sm" ? 24 : size === "md" ? 32 : 48}
        height={size === "sm" ? 24 : size === "md" ? 32 : 48}
        className={sizeClasses[size]}
        priority
      />
      {showText && (
        <span className={`font-bold text-blue-600 ${textSizeClasses[size]}`}>
          Sala Hogar
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
