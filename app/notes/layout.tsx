import { getNotesTree } from "@/lib/markdown";
import { NotesSidebar } from "@/components/layout/NotesSidebar";

export default function NotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tree = getNotesTree();

    return (
        <div className="container px-3 sm:px-6 max-w-[1800px] mx-auto flex flex-col md:flex-row gap-6">
            <NotesSidebar tree={tree} />
            <div className="flex-1 py-12 md:py-16 min-w-0">
                {children}
            </div>
        </div>
    );
}
