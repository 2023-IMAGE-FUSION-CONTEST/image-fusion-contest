import Input from "@/app/components/SearchInput";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Input />
            {children}
        </div>
    )
}
