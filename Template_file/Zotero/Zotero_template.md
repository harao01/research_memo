---
tags: 
citekey: "{{citekey}}"
dateread: '{{importDate | format("YYYY-MM-DD")}}'
read: false
---
 > [!Data]
> **PDF** {%- for attachment in attachments | filterby("path", "endswith", ".pdf") %}
> [{{attachment.title}}](file://{{attachment.path | replace(" ", "%20")}}) {%- endfor -%}.
> **Link**
> {%- if url %}[{{title}}]({{url}}){%- endif %}
# 1 Notes



## 1.1 Results




## 1.2 Relation with my work




# 2 Citation
{{bibliography.slice(4)}}
# 3 Related
{%for relation in relations | selectattr("citekey") %} [[@{{relation.citekey}}]]{% if not loop.last %}, {% endif%} {% endfor %}

>[!Info]
{% for type, creators in creators | groupby("creatorType") -%}
{%- for creator in creators -%}
> **{{"First" if loop.first}}{{type | capitalize}}**::
{%- if creator.name %} {{creator.name}}  
{%- else %} {{creator.lastName}}, {{creator.firstName}}{%- endif %}  {% endfor %}{%- endfor %}
> **Title**: {{title}}
> **Year**: {{date | format("YYYY")}}
> **Citekey**: {{citekey}} {%- if itemType %}
> **itemType**: {{itemType}}{%- endif %}{%- if itemType == "journalArticle" %}
>**Journal**: *{{publicationTitle}}* {%- endif %}{%- if volume %}
>**Volume**: {{volume}} {%- endif %}{%- if issue %}
>**Issue**: {{issue}}{%- endif %}

> [!Abstract]
> {%- if abstractNote %}
> {{abstractNote}}
> {%- endif -%}