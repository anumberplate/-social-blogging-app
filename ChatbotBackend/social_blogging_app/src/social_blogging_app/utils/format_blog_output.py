import re

def format_blog_output(raw_output: str) -> str:
    """
    Formats raw blog content from CrewOutput into structured HTML-compatible markdown.
    Handles both markdown-style and labeled sections.
    """
    formatted = raw_output.strip()

    # Convert labeled sections to headers
    section_patterns = {
        r"(?i)^Title:\s*(.+)": r"<h1><b>\1</b></h1>",
        r"(?i)^Summary:\s*(.+)": r"<h2><b>Summary</b></h2>\n<p>\1</p>",
        r"(?i)^Meta Description:\s*(.+)": r"<h3><b>Meta Description</b></h3>\n<i>\1</i>",
        r"(?i)^Hashtags:\s*(.+)": r"<h3><b>Hashtags</b></h3>\n<p>\1</p>"
    }

    for pattern, replacement in section_patterns.items():
        formatted = re.sub(pattern, replacement, formatted, flags=re.MULTILINE)

    # clean up duplicate hashtag sections
    formatted = re.sub(r"(# Hashtags\s*){2,}", "# Hashtags\n", formatted)

    return formatted
